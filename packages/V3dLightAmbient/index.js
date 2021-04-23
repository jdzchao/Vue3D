import V3dAmbient from "./src/V3dLightAmbient"

V3dAmbient.install = function (Vue) {
    Vue.component(V3dAmbient.name, V3dAmbient);
};

export default V3dAmbient
