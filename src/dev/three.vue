<template>
    <canvas>
        <template v-if="slot">
            <slot></slot>
            <box-helper></box-helper>
            <grid-helper></grid-helper>
        </template>
    </canvas>
</template>

<script>
    import * as THREE from "three"
    import event from "@v3d/core/Mixins/event"
    import Renderer from "@v3d/core/Libraries/renderer"
    import Orbit from "@v3d/core/Libraries/orbit"
    import BoxHelper from "@v3d/core/Plugins/BoxHelper"
    import GridHelper from "@v3d/core/Plugins/GridHelper"

    export default {
        name: "three",
        components: {
            BoxHelper,
            GridHelper,
        },
        mixins: {event},
        props: {
            width: {type: Number, required: true},
            height: {type: Number, required: true},
        },
        data() {
            return {
                id: "dev",
                camera: null,
                scene: null,
                renderer: null,
                mesh: null,
                orbit: null,
                slot: false,
            }
        },
        mounted() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 3000);
            this.scene.add(this.camera);

            let sub_scene = new THREE.Scene();
            let geometry = new THREE.BoxBufferGeometry(200, 200, 200);
            let material = new THREE.MeshBasicMaterial({});

            this.mesh = new THREE.Mesh(geometry, material);
            sub_scene.add(this.mesh);

            this.scene.add(sub_scene);

            this.renderer = new Renderer(this.$el, {antialias: true});
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(this.width, this.height);
            this.camera.position = new THREE.Vector3(0, 0, -500)
            this.orbit = new Orbit(this.camera, this.$el);
            this.orbit.control.addEventListener('change', this.render, false);
            // this.$el.appendChild(this.renderer.renderer.domElement);
            //
            this.$el.addEventListener('resize', this.onWindowResize, false);
            this.renderer.setActive(this.scene, this.camera).render(() => {
                this.slot = true;
            });
            console.log(this.scene)
        },
        methods: {
            vue3d() {
                return {
                    $_canvas: this.$data.$_canvas,
                    $_scene: this.$data.$_scene,
                    $_camera: this.$data.$_camera,
                }
            },
            render() {
                this.renderer.render(() => {
                    // this.setStatus('render');
                    // this.orbit.update();
                    // this.emit("update"); // 向组件发送更新指令
                });
            },
            onWindowResize() {
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.width, this.height);
            }
        },
        watch: {
            width(val, oldVal) {
                if (val === oldVal) return;
                this.onWindowResize();
            },
            height(val, oldVal) {
                if (val === oldVal) return;
                this.onWindowResize();
            },
            ratio(val, oldVal) {
                if (val === oldVal) return;
                this.onWindowResize();
            },
            background(val, oldVal) {
                if (val === oldVal) return;
                this.$data.$_scene.background = val;
                this.scene.background = val;
                this.render();
            }
        }
    }
</script>
