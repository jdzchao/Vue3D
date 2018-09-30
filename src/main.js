import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n' // load i18n
import './utils'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// load css
import 'animate.css'

i18n.SetLocale('zhcn');

Vue.use(ElementUI);

/* Config */
Vue.config.productionTip = false;

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
});
vm.$mount("#app");
