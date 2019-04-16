import * as THREE from "three"
import {Vue3d} from "../common";
import Object3d from "./Object3d"

export default {
    name: "Camera",
    mixins: [Object3d],
    props: {
        x: {type: Number, default: 0}, // viewport x 零点：左
        y: {type: Number, default: 0}, // viewport y 零点：下
        width: {type: Number, default: 100}, // viewport width
        height: {type: Number, default: 100}, // viewport height
        // layer: {type: Number, default: 1},
    },
    data() {
        return {
            camera: null,
        }
    },
    beforeMount() {
        // this.camera.layer = this.layer;
        this.camera.viewport = new THREE.Vector4(this.x, this.y, this.width, this.height);
        this.object3d = this.camera;
        Vue3d.$emit("add-camera", this.camera);
        // this.root.cameras.push(this.camera);
    }
}
