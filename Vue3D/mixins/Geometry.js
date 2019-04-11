import * as THREE from 'three'
import Object3d from "./Object3d"

export default {
    name: "Geometry",
    mixins: [Object3d],
    props: {
        buffer: false,
        helper: false,
        material: {type: Object},
    },
    data() {
        return {
            V$keyPoint: 'geometry',
            geometry: null
        }
    },
    watch: {
        material(val, oldVal) {
            if (oldVal !== val && oldVal !== null) {
                this.setMaterial(val);
            }
        },
    },
    methods: {
        setMaterial(mtl) {
            if (this.geometry) {
                this.object3d = new THREE.Mesh(this.geometry, mtl);
            }
        }
    },
    beforeMount() {
        this.setMaterial(this.material);
    }
}
