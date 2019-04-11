<template>
    <object :name="$options.name" style="display:none;" :aspect="aspect">
        <slot v-if="slot"></slot>
    </object>
</template>

<script>

    import * as THREE from "three"
    import Camera from "../../mixins/Camera";

    export default {
        name: "V3dCameraPerspective",
        mixins: [Camera],
        props: {
            near: {type: Number, default: 1},
            far: {type: Number, default: 1000},
            dis: {type: Number, default: 100},
            size: {type: Number, default: 100},
        },
        computed: {
            aspect() {
                this.$nextTick(() => {
                    this.updateCamera(); // 重置相机相关配置
                    this.render();
                });
                return this.width / this.height;
            }
        },
        methods: {
            fov() {
                let size = this.size;
                if (this.aspect < 1) {
                    size = size / this.aspect;
                } else {
                    size = size * this.aspect;
                }
                return Math.atan(size / this.dis / 2) * (180 / Math.PI);
            },
            updateCamera() {
                this.camera.fov = this.fov();
                this.camera.aspect = this.aspect;
                this.camera.updateProjectionMatrix();
            }
        },
        created() {
            this.camera = new THREE.PerspectiveCamera(this.fov(), this.width / this.height, this.near, this.far);
            this.camera.layer = this.layer;
            // this.camera.position.z = this.dis + this.size * 2;
        },

    }
</script>
