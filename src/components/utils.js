module.exports = {
  // 优先从storage中读取数据,如果未获取到数据再尝试从cookie中获取
  read(key = '') {
    if (!key) return false;
    let value = null;
    if (window.localStorage) {
      value = window.localStorage.getItem(key);
    }
    if (value === null || value === '') {
      value = this.getCookie(key);
    }
    return value;
  },
  write(key = '', value = '', expiredays = 30, path = '/') {
    if (!key) return false;
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
    this.setCookie(key, value, expiredays, path);
  },
  /**
   * 不推荐使用以下两个方法来读取缓存 ****************************************************************************
   */
  getCookie(c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + '=');
      let c_end = null;
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(';', c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return '';
  },
  setCookie(c_name, value, expiredays = 30, path = '/') {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =
      c_name +
      '=' +
      encodeURIComponent(value) +
      (expiredays == null ? '' : ';expires=' + exdate.toUTCString()) +
      (path == null ? '' : ';path=' + path);
  },
  /**
   * 不推荐使用以上两个方法来读取缓存 ****************************************************************************
   */
  typeof(value) {
    return Object.prototype.toString
      .call(value)
      .slice(8, -1)
      .toLowerCase();
  },
  generateRandId(len = 16) {
    const str =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for (let i = 0; i < len; i++) {
      let r = Math.floor(Math.random() * 62);
      id += str.substring(r, r + 1);
    }
    return id;
  },
  formatDate(date, format = 'yyyy-mn-dd mm:hh:ss') {
    if (!date) {
      return '';
    }
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = d.getDate();
    day = day < 10 ? '0' + day : day;
    let hour = d.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute = d.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second = d.getSeconds();
    second = second < 10 ? '0' + second : second;

    format = format.replace('yyyy', year);
    format = format.replace('mn', month);
    format = format.replace('dd', day);
    format = format.replace('hh', hour);
    format = format.replace('mm', minute);
    format = format.replace('ss', second);

    return format;
  },
  valueFromUrl(key) {
    let url = window.location.search;
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
    let result = url.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  HTMLDecode(value) {
    let temp = document.createElement('div');
    temp.innerHTML = value;
    return temp.innerText || temp.textContent;
  }
};
