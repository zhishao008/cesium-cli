import Vue from 'vue';
import Component from './KyLoading.vue';

const Constructor = Vue.extend(Component);

const instance = new Constructor({
  el: document.createElement('div')
});

Constructor.prototype.open = () => {
  document.body.appendChild(instance.$el);
};

Constructor.prototype.close = () => {
  const el = instance.$el;
  el.parentNode && el.parentNode.removeChild(el);
};

export default {
  open: instance.open,
  close: instance.close
};
