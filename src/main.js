// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Loading from './components/loading/index.js'
import Dialog from './components/dialog/index.js'
import Alert from './components/alert/index.js'

Vue.config.productionTip = false

Vue.prototype.$loading = Loading;
Vue.prototype.$alert = Alert;
Vue.prototype.$dialog = Dialog;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
