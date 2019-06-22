import Vue3d from './Vue3d.vue'

Vue3d.install = function (Vue) {
    Vue.component(Vue3d.name, Vue3d);
};

export default Vue3d
