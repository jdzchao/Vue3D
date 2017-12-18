import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import i18n from './i18n' // load i18n
import './utils'
// load css
import 'animate.css'

i18n.SetLocale('zhcn');

Vue.config.productionTip = false;

Vue.prototype.$http = http;

const vue = new Vue({
  router,
  store,
  template: '<App/>',
  components: {App}
});
http.complete(() => {
  vue.$mount("#app");
});
