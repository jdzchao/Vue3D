import Vue from 'vue'
import App from './App.vue'
// load config
import './config'
import router from './config/router'
import store from './config/store'
// load css
import 'animate.css'
// load i18n
import i18n from './i18n'

i18n.SetLocale('zhcn');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount("#app");
