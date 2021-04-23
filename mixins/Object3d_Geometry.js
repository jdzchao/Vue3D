import * as THREE from 'three'
import Object3d from "./Object3d"

export default {
    name: "Object3d_Geometry",
    mixins: [Object3d],
    props: {
        buffer: false,
        helper: false,
        material: {type: Object},
    },
    data() {
        return {
            geometry: null
        }
    },
    beforeMount() {
        this.setMaterial(this.material);
    },
    methods: {
        setMaterial(mtl) {
            if (this.geometry) {
                this.object3d = new THREE.Mesh(this.geometry, mtl);
            }
        }
    },
    watch: {
        material(val, oldVal) {
            if (oldVal !== val && oldVal !== null) {
                this.setMaterial(val);
            }
        },
    },

}
