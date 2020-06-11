import * as THREE from "three"
import Bus from "../../../bus"
import Object3d from "../../../mixins/Object3d";

export default {
    name: "V3dLightSpot",
    mixins: [Object3d],
    props: {
        color: {type: String, default: 'rgb(255,255,255)'},
        intensity: {type: Number, default: 1.0},
        distance: {type: Number, default: 1000},
        angle: {type: Number, default: Math.PI / 2},
        penumbra: {type: Number, default: 1},
        decay: {type: Number, default: 1},
        /* helper */
        withHelper: {type: Boolean, default: true},
        visibleHelper: {type: Boolean, default: false},
    },
    created() {
        this.light = new THREE.SpotLight(this.color, this.intensity, this.distance, this.angle, this.penumbra, this.decay);
    },
    beforeMount() {
        this.object3d = this.light;
        if (Bus.config.helper && this.withHelper) {
            this.helper = new THREE.SpotLightHelper(this.light);
            this.helper.visible = this.visibleHelper;
            this.object3d.helper = this.helper;
            this.scene.add(this.helper)
        }
    }
}
