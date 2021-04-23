import * as THREE from "three"
import Bus from "../../../bus"
import Object3d from "../../../mixins/Object3d";

export default {
    name: "V3dCameraPerspective",
    mixins: [Object3d],
    props: {
        x: {type: Number, default: 0}, // viewport x 零点：左
        y: {type: Number, default: 0}, // viewport y 零点：下
        width: {type: Number, default: 100}, // viewport width
        height: {type: Number, default: 100}, // viewport height
        near: {type: Number, default: 0.1},
        far: {type: Number, default: 2000},
        fov: {type: Number, default: 50},
        /* helper */
        withHelper: {type: Boolean, default: true},
        visibleHelper: {type: Boolean, default: false},
    },
    data() {
        return {
            camera: null,
            helper: null
        }
    },
    watch: {
        width() {
            this.updateCamera()
        },
        height() {
            this.updateCamera()
        },
        fov() {
            this.updateCamera()
        },
    },
    created() {
        this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, this.near, this.far);
    },
    beforeMount() {
        this.camera.viewport = new THREE.Vector4(this.x, this.y, this.width, this.height);
        this.object3d = this.camera;
        this.scene.cameras.push(this.camera);
        if (Bus.config.helper && this.withHelper) {
            this.helper = new THREE.CameraHelper(this.camera);
            this.helper.visible = this.visibleHelper;
            this.object3d.helper = this.helper;
            this.scene.add(this.helper)
        }
    },
    methods: {
        updateCamera() {
            this.camera.fov = this.fov;
            this.camera.aspect = this.width / this.height;
            this.camera.viewport.set(this.x, this.y, this.width, this.height);
            this.camera.updateProjectionMatrix();
        },
    },
}
