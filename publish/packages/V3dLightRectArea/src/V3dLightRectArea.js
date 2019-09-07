import * as THREE from "three"
import Bus from "../../../bus"
import Object3d from "../../../mixins/Object3d";
import {RectAreaLightUniformsLib} from "three/examples/jsm/lights/RectAreaLightUniformsLib"

export default {
    name: "V3dLightRectArea",
    mixins: [Object3d],
    props: {
        width: {type: Number, default: 10},
        height: {type: Number, default: 10},
        color: {type: String, default: 'rgb(255,255,255)'},
        intensity: {type: Number, default: 1.0},
        /* helper */
        withHelper: {type: Boolean, default: true},
        visibleHelper: {type: Boolean, default: false},
    },
    data() {
        return {
            light: null,
            helper: null
        }
    },
    methods: {
        setHelper() {
            this.light.add(this.helper);
        }
    },
    created() {
        RectAreaLightUniformsLib.init();
        this.light = new THREE.RectAreaLight(this.color, this.intensity, this.width, this.height);

    },
    beforeMount() {
        this.object3d = this.light;
        if (Bus.config.helper && this.withHelper) {
            this.helper = new THREE.RectAreaLightHelper(this.light);
            this.helper.visible = this.visibleHelper;
            this.object3d.helper = this.helper;
            this.object3d.add(this.helper)
        }
    }
}
