import * as THREE from "three"
import Object3d from "./Object3d"

export default {
    name: "Object3d_Camera",
    mixins: [Object3d],
    props: {
        x: {type: Number, default: 0}, // viewport x 零点：左
        y: {type: Number, default: 0}, // viewport y 零点：下
        width: {type: Number, default: 100}, // viewport width
        height: {type: Number, default: 100}, // viewport height
    },
    data() {
        return {
            camera: null,
        }
    },
    beforeMount() {
        this.camera.viewport = new THREE.Vector4(this.x, this.y, this.width, this.height);
        this.object3d = this.camera;
        this.scene.cameras.push(this.camera);
    }
}
