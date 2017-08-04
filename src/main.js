import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import './utils'
// load config
import router from './config/router'
import store from './config/store'
// load css
import 'animate.css'
// load i18n
import i18n from './i18n'

i18n.SetLocale('zhcn');

Vue.config.productionTip = false;

Vue.prototype.$store = {};
Vue.prototype.$http = Axios;

new Vue({
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount("#app");
