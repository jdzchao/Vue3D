import VScene from './packages/VScene'
import WOrbitControls from './packages/WOrbitControls'
import WRayCast from './packages/WRaycast'
import WSkyBox from './packages/WSkyBox'
import WAnimation from './packages/WAnimation'
import XBoxGeometry from './packages/XBoxGeometry'
import XCamera from './packages/XCamera'
import XLight from './packages/XLight'
import XObjLoader from './packages/XObjLoader'

import Materials from './packages/Materials'
import Utils from './packages/Utils'

export {
  VScene,
  WOrbitControls,
  WRayCast,
  WSkyBox,
  WAnimation,
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
    Vue.component('w-ray-case', WRayCast);
    Vue.component('w-sky-box', WSkyBox);
    Vue.component('w-animation', WAnimation);
    Vue.component('x-box-geometry', XBoxGeometry);
    Vue.component('x-camera', XCamera);
    Vue.component('x-light', XLight);
    Vue.component('x-obj-loader', XObjLoader);
  }
};

export default Vue3D;
