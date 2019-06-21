import Vue from 'vue'
import App from './App.vue'
// import Vue3D from '../publish'
// CSS
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// Vue preset
// Vue.use(Vue3D, {debug: false})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
