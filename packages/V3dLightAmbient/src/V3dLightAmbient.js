import * as THREE from "three"
import Object3d from "../../../mixins/Object3d";

export default {
    name: "V3dLightAmbient",
    mixins: [Object3d],
    props: {
        color: {type: String, default: 'rgb(255,255,255)'},
        intensity: {type: Number, default: 1.0},
    },
    created() {
        this.light = new THREE.AmbientLight(this.color, this.intensity);
    },
    beforeMount() {
        this.object3d = this.light;
    }
}
