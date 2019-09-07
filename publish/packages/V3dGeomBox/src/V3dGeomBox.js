import * as THREE from "three"
import Object3d_Geometry from "../../../mixins/Object3d_Geometry"

export default {
    name: "V3dGeomBox",
    mixins: [Object3d_Geometry],
    props: {
        x: {type: Number, default: 1},
        y: {type: Number, default: 1},
        z: {type: Number, default: 1},
        xSegments: {type: Number, default: 1},
        ySegments: {type: Number, default: 1},
        zSegments: {type: Number, default: 1},
    },
    created() {
        if (this.buffer) {
            this.geometry = new THREE.BoxBufferGeometry(this.x, this.y, this.z);
        } else {
            this.geometry = new THREE.BoxGeometry(this.x, this.y, this.z);
        }
    }
}
