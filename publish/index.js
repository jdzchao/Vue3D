// 全局总线
import Bus from './bus'
// 核心组件
import Vue3d from "./core"
// 场景
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
import V3dLoaderObj from "./packages/V3dLoaderObj"; // Obj Loader

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

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
}

export {
    Bus,
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
}
