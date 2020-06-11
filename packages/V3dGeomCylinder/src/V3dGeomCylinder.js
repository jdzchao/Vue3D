import * as THREE from "three"
import Object3d_Geometry from "../../../mixins/Object3d_Geometry"

export default {
    name: "V3dGeomCylinder",
    mixins: [Object3d_Geometry],
    props: {
        top: {type: Number, default: 1},
        bottom: {type: Number, default: 1},
        height: {type: Number, default: 1},
        radialSegments: {type: Number, default: 8},
        heightSegments: {type: Number, default: 1},
        openEnded: {type: Boolean, default: false},
        thetaStart: {type: Number, default: 0},
        thetaLength: {type: Number, default: Math.PI},
    },
    created() {
        if (this.buffer) {
            this.geometry = new THREE.CylinderBufferGeometry(this.top, this.bottom, this.height, this.radialSegments);
        } else {
            this.geometry = new THREE.CylinderGeometry(this.top, this.bottom, this.height, this.radialSegments);
        }
    }
}
