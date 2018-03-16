import Vue from 'vue';
import Component from './KyDialog.vue';
import Utils from '../utils.js';
// import store from '../../../store/index.js';

const Constructor = Vue.extend(Component);

const instance = new Constructor({
  el: document.createElement('div')
});

Constructor.prototype.close = (callback = null) => {
  const el = instance.$el;

  if (Utils.typeof(callback) === 'function') {
    callback();
    if (instance.nextRemind.show && instance.nextRemind.select) {
      let obj = {};
      obj[instance.nextRemind.dialogName] = false;
      store.commit('SetShowDialog', obj);
    }
  }

  el.parentNode && el.parentNode.removeChild(el);
};

export default (options = {}) => {
  instance.msg = options.msg || '';
  instance.title = options.title || '提示';
  instance.isClose = !!options.isClose;
  instance.btns = options.btns || [
    {
      text: '取消'
    }
  ];
  instance.showNextRemind = options.showNextRemind || false;
  instance.nextRemind = options.nextRemind || {
    show: false,
    select: false,
    dialogName: ''
  };

  document.body.appendChild(instance.$el);
};
