<template>
    <canvas :id="id">
        <template v-if="slot">
            <slot></slot>
        </template>
        Sorry, your web browser does not support WebGL
    </canvas>
</template>

<script>
    import * as THREE from 'three/src/Three'
    import config from './config'
    // Mixins
    import event from "./Mixins/event"
    import plugins from "./Mixins/plugins"
    // Libraries
    import Renderer from "./Libraries/renderer"
    import ScenesManager from "./Libraries/scenes";
    import Orbit from "./Libraries/orbit";

    export default {
        name: "Vue3d",
        extends: config,
        mixins: [event, plugins],
        props: {
            id: {type: String, default: 'Vue3D'},
            width: {type: Number, required: true},
            height: {type: Number, required: true},
            ratio: {type: Number, default: 1},
        },
        data() {
            return {
                /* Vue3D Base Component */
                canvas: null, // canvas dom
                camera: null, // main camera

                renderer: null, // renderer
                scenes: null, // scenes manager
                orbit: null, // orbit control
                /* status */
                slot: false,
            }
        },
        created() {
            this.lifecycle('awake');
        },
        mounted() {
            // 初始化基础组件
            this.canvas = this.$el;
            // 初始化 Vue3D Renderer
            this.renderer = new Renderer(this.canvas, this.conf.renderer);
            // 初始化 Scenes Manager
            this.scenes = new ScenesManager();
            // 初始化主摄像机
            this.camera = new THREE.PerspectiveCamera(this.conf.camera.fov, this.width / this.height, this.conf.camera.near, this.conf.camera.far);
            this.camera.name = 'main';
            this.scenes.base.cameras.push(this.camera);
            // 初始化 Orbit Controller
            this.orbit = new Orbit(this.camera, this.canvas);
            this.orbit.control.addEventListener('change', this.render, false);
            // 渲染第一帧
            this.renderer.setActive(this.scenes.base, this.camera).render(() => {
                this.slot = true;
                this.lifecycle('start');
                this.$emit('success');
            });
        },
        methods: {
            /**
             * 用于挂载时，获取Vue3d基础成员
             * */
            vue3d() {
                return {
                    canvas: this.canvas,
                    scene: this.scenes.base,
                    camera: this.camera,
                }
            },
            /**
             * 渲染一帧
             */
            render(callback) {
                this.renderer.render(() => {
                    if (callback && typeof callback === "function") callback();
                    this.lifecycle('update');
                });
            },
            /**
             * 重置窗口大小
             */
            resize() {
                if (!this.renderer) return;
                this.renderer.setSize(this.width, this.height);
                this.renderer.setPixelRatio(this.ratio);
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix(); // 摄像机参数改变后必须执行生效
                this.render();
            }
        },
        watch: {
            width(val, oldVal) {
                if (val === oldVal) return;
                this.resize();
            },
            height(val, oldVal) {
                if (val === oldVal) return;
                this.resize();
            },
            ratio(val, oldVal) {
                if (val === oldVal) return;
                this.resize();
            }
        }
    }
</script>
