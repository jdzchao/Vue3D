import vue3d from './packages/Vue3D'
import * as THREE from 'three'

export default {
  install: function (Vue, options) {
    vue3d.size = options && options.hasOwnProperty('size') ? options.size : 100;
    Vue.prototype.$vue3d = vue3d;
    Vue.mixin({
      created () {
        if (!vue3d.scene) {
          vue3d.scene = new THREE.Scene();
        }
      }
    });
    Vue.render = function () {
      vue3d.render();
    }
  }
};
