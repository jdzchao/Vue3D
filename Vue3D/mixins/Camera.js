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
        distance: {type: Number, default: 100},
        layer: {type: Number, default: 1},
    },
    data() {
        return {
            V$keyPoint: 'camera',
            camera: null,
        }
    },
    beforeMount() {
        this.camera.layer = this.layer;
        this.camera.viewport = new THREE.Vector4(this.x, this.y, this.width, this.height);
        console.log(this.camera.viewport);
        this.object3d = this.camera;
        this.root.cameras.push(this.camera);
    }
}
