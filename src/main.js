import Vue from 'vue'
import App from './App.vue'
import router from './router'
// CSS
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// Vue preset
// Vue.use(Vue3D, {debug: false})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
