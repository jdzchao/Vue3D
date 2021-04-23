import * as THREE from "three"
import Object3d from "./Object3d"

export default {
    name: "Object3d_Loader",
    mixins: [Object3d],
    props: {
        path: {type: String},
        name: {type: String, default: 'Object3D'},
    },
    data() {
        return {
            manager: new THREE.LoadingManager(),
            loader: null,
        }
    },
    methods: {
        loaded(object) {
            this.$emit('loaded', object);
        },
        process(xhr) {
            this.$emit('process', xhr);
        },
        error(err) {
            this.$emit('error', err);
        }
    }
}
