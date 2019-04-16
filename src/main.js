import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import Vue3D from '../Vue3D'

import '@/assets/styles/index.scss' // global css
import '@/assets/icon-font' //icon font
import '@/assets/icon-svg' //icon svg
import '@/errorLog' // error log
import '@/permission' // permission control
import '@/utils/global'

import i18n from './i18n'

// Vue.use(Vue3D);
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})

import * as filters from './filters' // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
