import Vue from 'vue'
import App from './App.vue'
// load config
import './config'
import router from './config/router'
import http from './config/http'
import api from './config/api'
import store from './config/store'

import i18n from './i18n'

i18n.SetLocale('zhcn');

// Vue.prototype.$http = http.http;
// Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount("#app");
