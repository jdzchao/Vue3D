import VScene from './packages/VScene'
<<<<<<< HEAD
import WOrbitControls from './packages/WOrbitControls'
=======
import MCamera from './packages/MCamera'
import MOrbitControls from './packages/MOrbitControls'
import MRenderer from './packages/MRenderer'
>>>>>>> dev
import XBoxGeometry from './packages/XBoxGeometry'
import XCamera from './packages/XCamera'
import XLight from './packages/XLight'
import XObjLoader from './packages/XObjLoader'

import Materials from './packages/Materials'
<<<<<<< HEAD
import Utils from './packages/Utils'

export {
  VScene,
  WOrbitControls,
=======
import Vue3D from './packages/Vue3D'

export {
  Vue3D,
  VScene,
  MCamera,
  MOrbitControls,
  MRenderer,
>>>>>>> dev
  XBoxGeometry,
  XCamera,
  XLight,
  XObjLoader,
  Utils,
  Materials
};

const $vue3d = {
  Utils, Materials
};

const Vue3D = {
  install: function (Vue, options) {
    Vue.prototype.$vue3d = $vue3d;
    Vue.component('v-scene', VScene);
    Vue.component('w-orbit-controls', WOrbitControls);
    Vue.component('x-box-geometry', XBoxGeometry);
    Vue.component('x-camera', XCamera);
    Vue.component('x-light', XLight);
    Vue.component('x-obj-loader', XObjLoader);
  }
};

export default Vue3D;
