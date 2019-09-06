import axios from 'axios';
var instance = axios.create({
  baseURL: 'http://10.30.21.80:8000/mf/api/',
  timeout: 10000,
  // responseType: 'json',
  headers: {
      'Content-Type': 'application/json; charset=utf-8',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "Authorization": 'UserId=Emp201900001; path=/, EmployeeId=d37ed0a7-39f6-497b-8998-6fa25b304c07; path=/'
  }
});
/**
 * 接口命名
 */
const urlmap = new Map([
  ['login','Auth/login'], //获取我的代办列表
  ['GetHazardInfo','Hzd/GetHazardInfo'], //获取我的代办列表
  ['GetHazardInfoOnFilter','Hzd/GetHazardInfoOnFilter'], //获取全部隐患列表
  ['GetAllStateForSearch','Hzd/GetAllStateForSearch'], //获取全部隐患筛选
  ['GetHazardSource','Hzd/GetHazardSource'], //获取隐患来源列表
  ['GetHazardType','Hzd/GetHazardType'], //获取隐患类型列表
  ['GetHazardReason','Hzd/GetHazardReason'], //获取隐患原因列表
  ['GetDevice','Hzd/GetDevice'], //获取设备列表
  ['GetLocationArealist','Hzd/GetLocationArealist'], //获取区域列表，并自动填入第一个：如果包括地图
  ['HazardSave','Hzd/HazardSave'], //提交新增的隐患
  ['GetHazardBusinessInfo','Hzd/GetHazardBusinessInfo'], //获取隐患业务处理信息
  ['','Hzd/'], //
]);
// Request.httpPost("login",{"Password" : "123456", "UserId" : "SES"});
class Request {

  async httpPost(url, params = {}) {
    return await instance.post(urlmap.get(url), params)
    .then(res => {
      if(res.status === 200){
        return res.data;
      } else {
        console.log("请求错误码 ：" + res.status);
      }
    })
    .catch(error => console.log(error));
  }

  async httpGet(url, params = {}) {
    return await instance.post(urlmap.get(url), params)
    .then(res => {
      if(res.status === 200){
        return res.data;
      } else {
        console.log("请求错误码 ：" + res.status);
      }
    })
    .catch(error => console.log(error));
  }
}

export default new Request();