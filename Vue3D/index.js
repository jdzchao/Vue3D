// 场景 && 渲染器
import V3dScene from "./packages/V3dScene"
// 摄像机
import V3dPerspectiveCamera from "./packages/V3dPerspectiveCamera" // 透视像机
// 几何体
import V3dGeomBox from "./packages/V3dGeomBox" // Box

// 工具
import Materials from './packages/Materials'
import Utils from './packages/Utils'

export {
    V3dScene,
    V3dPerspectiveCamera,
    V3dGeomBox
};

/**
 * 全局加载
 */
const $vue3d = {
    Utils, Materials
};

const Vue3D = {
    install: function (Vue, options) {
        Vue.prototype.$vue3d = $vue3d;
        Vue.component("v3d-scene", V3dScene);
        Vue.component("v3d-perspective-camera", V3dPerspectiveCamera);
        Vue.component("v3d-geom-box", V3dGeomBox);
    }
};

export default Vue3D;
