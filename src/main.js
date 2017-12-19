import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import i18n from './i18n' // load i18n
import './utils'
// load css
import 'animate.css'
<<<<<<< HEAD
=======
// load i18n
import i18n from './i18n'
import vue3d from '../Vue3D'
>>>>>>> dev

i18n.SetLocale('zhcn');

Vue.config.productionTip = false;

<<<<<<< HEAD
Vue.prototype.$http = http;
import Vue3D from '../Vue3D'

Vue.use(Vue3D);
=======
Vue.prototype.$http = Axios;
>>>>>>> dev

const vue = new Vue({
  router,
  store,
  template: '<App/>',
  components: {App}
});
http.complete(() => {
  vue.$mount("#app");
});
