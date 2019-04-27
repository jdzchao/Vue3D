// 渲染器 && 主场景
import Bus from './bus'
import Vue3d from "./packages/Vue3d"
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
// Loader
import V3dLoaderObj from "./packages/V3dLoaderObj";
// Helper
// 工具
import Materials from './utils/Materials'
import Utils from './utils/Utils'


const components = [
    Vue3d,
    V3dScene,
    V3dCameraPerspective,
    V3dGeomBox,
    V3dGeomCylinder,
    V3dLightAmbient,
    V3dLightDirectional,
    V3dLightRectArea,
    V3dLightSpot,
    V3dLoaderObj,
];

const install = function (Vue, opts = {}) {
    Bus.setConf(opts);

    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.prototype.$vue3d = Bus; // 全局总线
};

export default {
    install,
};

export {
    Vue3d,
    V3dScene,
    V3dCameraPerspective,
    V3dGeomBox,
    V3dGeomCylinder,
    V3dLightAmbient,
    V3dLightDirectional,
    V3dLightRectArea,
    V3dLightSpot,
    V3dLoaderObj,
    Bus, Utils, Materials
}
