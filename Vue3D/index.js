// 场景 && 渲染器
import V3dScene from "./packages/V3dScene"
// 摄像机
import V3dCameraPerspective from "./packages/V3dCameraPerspective" // 透视像机
// 几何体
import V3dGeomBox from "./packages/V3dGeomBox" // Box
import V3dGeomCylinder from "./packages/V3dGeomCylinder" // Cylinder
// 灯光
import V3dLightAmbient from "./packages/V3dLightAmbient" // Ambient Light
import V3dLightDirectional from "./packages/V3dLightDirectional" // Directional Light
import V3dLightRectArea from "./packages/V3dLightRectArea" // RectArea Light
import V3dLightSpot from "./packages/V3dLightSpot" // Spot Light
// Helper
import V4hBox from "./packages/V4hBox"
import V4hGrid from "./packages/V4hGrid"
import V4hOrbitControls from "./packages/V4hOrbitControls"
import V4hRayCast from "./packages/V4hRayCast"
import V4hSkyBox from "./packages/V4hSkyBox";
// 工具
import Materials from './utils/Materials'
import Utils from './utils/Utils'

export {
    V3dScene,
    V3dCameraPerspective,
    V3dGeomBox,
    V3dGeomCylinder,
    V3dLightAmbient,
    V3dLightDirectional,
    V3dLightRectArea,
    V3dLightSpot,
    V4hBox,
    V4hGrid,
    V4hOrbitControls,
    V4hRayCast,
    V4hSkyBox,
    // utils
    Materials,
};

/**
 * 全局加载
 */
export default {
    install: function (Vue, options) {
        // Vue.prototype.$vue3d = Vue3d;
        Vue.component("v3d-scene", V3dScene);
        Vue.component("v3d-camera-perspective", V3dCameraPerspective);
        Vue.component("v3d-geom-box", V3dGeomBox);
        Vue.component("v3d-geom-cylinder", V3dGeomCylinder);
        Vue.component("v3d-light-ambient", V3dLightAmbient);
        Vue.component("v3d-light-directional", V3dLightDirectional);
        Vue.component("v3d-light-rect-area", V3dLightRectArea);
        Vue.component("v3d-light-spot", V3dLightSpot);
        Vue.component("v4h-box", V4hBox);
        Vue.component("v4h-grid", V4hGrid);
        Vue.component("v4h-orbit-controls", V4hOrbitControls);
        Vue.component("V4h-ray-cast", V4hRayCast);
        Vue.component("V4h-sky-box", V4hSkyBox);
    }
};
