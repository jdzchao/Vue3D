import V3dScene from "./packages/V3dScene"
import V3dCamera from "./packages/V3dCamera"

import VScene from './packages/VScene'
import WBoxHelper from './packages/WBoxHelper'
import WGridHelper from './packages/WGridHelper'
import WOrbitControls from './packages/WOrbitControls'
import WRayCast from './packages/WRayCast'
import WSkyBox from './packages/WSkyBox'
import WTransformControls from './packages/WTransformControls'
import XBoxGeometry from './packages/XBoxGeometry'
import XCamera from './packages/XCamera'
import XLight from './packages/XLight'
import XObjLoader from './packages/XObjLoader'

import Materials from './packages/Materials'
import Utils from './packages/Utils'

export {
    V3dScene,
    V3dCamera
};

const $vue3d = {
    Utils, Materials
};

const Vue3D = {
    install: function (Vue, options) {
        Vue.prototype.$vue3d = $vue3d;
        Vue.component("v3d-scene", V3dScene);
        Vue.component("v3d-camera", V3dCamera);
        // Vue.component('v-scene', VScene);
        // Vue.component('v-box-helper', WBoxHelper);
        // Vue.component('w-grid-helper', WGridHelper);
        // Vue.component('w-orbit-controls', WOrbitControls);
        // Vue.component('w-ray-cast', WRayCast);
        // Vue.component('w-sky-box', WSkyBox);
        // Vue.component('w-transform-controls', WTransformControls);
        // Vue.component('x-box-geometry', XBoxGeometry);
        // Vue.component('x-camera', XCamera);
        // Vue.component('x-light', XLight);
        // Vue.component('x-obj-loader', XObjLoader);
    }
};

export default Vue3D;
