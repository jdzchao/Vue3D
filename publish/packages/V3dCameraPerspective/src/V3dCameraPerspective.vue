<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot"></slot>
    </object>
</template>

<script>

    import * as THREE from "three"
    import Object3d_Camera from "../../../mixins/Object3d_Camera";

    export default {
        name: "V3dCameraPerspective",
        mixins: [Object3d_Camera],
        props: {
            near: {type: Number, default: 0.1},
            far: {type: Number, default: 2000},
            fov: {type: Number, default: 50},
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
            }
        },
        methods: {
            updateCamera() {
                this.camera.fov = this.fov;
                this.camera.aspect = this.width / this.height;
                this.camera.viewport.set(this.x, this.y, this.width, this.height);
                this.camera.updateProjectionMatrix();
            }
        },
        created() {
            this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, this.near, this.far);
        },

    }
</script>
