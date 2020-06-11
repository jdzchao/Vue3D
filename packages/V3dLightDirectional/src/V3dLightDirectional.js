import * as THREE from "three"
import Bus from "../../../bus"
import Object3d from "../../../mixins/Object3d";

export default {
    name: "V3dLightDirectional",
    mixins: [Object3d],
    props: {
        color: {type: String, default: 'rgb(255,255,255)'},
        intensity: {type: Number, default: 1.0},
        /* helper */
        withHelper: {type: Boolean, default: true},
        visibleHelper: {type: Boolean, default: false},
    },
    created() {
        this.light = new THREE.DirectionalLight(this.color, this.intensity);
    },
    beforeMount() {
        this.object3d = this.light;
        if (Bus.config.helper && this.withHelper) {
            this.helper = new THREE.DirectionalLightHelper(this.light);
            this.helper.visible = this.visibleHelper;
            this.object3d.helper = this.helper;
            this.object3d.add(this.helper)
        }
    }
}
