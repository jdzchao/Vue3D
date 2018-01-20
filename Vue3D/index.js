import VScene from './packages/VScene'
import WGridHelper from './packages/WGridHelper'
import WOrbitControls from './packages/WOrbitControls'
import WRayCast from './packages/WRayCast'
import WSkyBox from './packages/WSkyBox'
<<<<<<< HEAD
import WTransformControls from './packages/WTransformControls'
=======
>>>>>>> pr/21
import XBoxGeometry from './packages/XBoxGeometry'
import XCamera from './packages/XCamera'
import XLight from './packages/XLight'
import XObjLoader from './packages/XObjLoader'

import Materials from './packages/Materials'
import Utils from './packages/Utils'

export {
  VScene,
  WGridHelper,
  WOrbitControls,
  WRayCast,
  WSkyBox,
<<<<<<< HEAD
  WTransformControls,
=======
>>>>>>> pr/21
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
    Vue.component('w-grid-helper', WGridHelper);
    Vue.component('w-orbit-controls', WOrbitControls);
    Vue.component('w-ray-cast', WRayCast);
    Vue.component('w-sky-box', WSkyBox);
<<<<<<< HEAD
    Vue.component('w-transform-controls', WTransformControls);
=======
>>>>>>> pr/21
    Vue.component('x-box-geometry', XBoxGeometry);
    Vue.component('x-camera', XCamera);
    Vue.component('x-light', XLight);
    Vue.component('x-obj-loader', XObjLoader);
  }
};

export default Vue3D;
