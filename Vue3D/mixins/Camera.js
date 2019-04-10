import * as THREE from "three"
import Object3d from "./Object3d"

export default {
    name: "Camera",
    mixins: [Object3d],
    props: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
        width: {type: Number, default: 100},
        height: {type: Number, default: 100},
        distance: {type: Number, default: 100}
    },
    data() {
        return {
            _keyPoint: 'camera',
            camera: null,
            layers: 1,
            viewport: {x: this.x, y: this.y, w: this.width, h: this.height}
        }
    },
    beforeMount() {
        this.camera.viewport = new THREE.Vector4(this.x, this.y, this.width, this.height);
        this.object3d = this.camera;
        this.root.cameras.push(this.camera);
    }
}
