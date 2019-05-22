<template>
    <canvas :id="id">
        <template v-if="slot">
            <slot></slot>
            <box-helper v-bind="conf.box" v-if="plugins.box"></box-helper>
            <!--            <grid-helper v-bind="conf.grid" v-if="plugins.grid"></grid-helper>-->
        </template>
        Sorry, your web browser does not support WebGL
    </canvas>
</template>

<script>
    import * as THREE from 'three/src/Three'
    import Bus from "../bus"
    // Plugins
    import BoxHelper from "./Plugins/BoxHelper"
    import GridHelper from "./Plugins/GridHelper"
    // Mixins
    import event from "./Mixins/event"
    // Libraries
    import Renderer from "./Libraries/renderer"
    import Orbit from "./Libraries/orbit";
    import ScenesManager from "./Libraries/scenes";

    export default {
        name: "Vue3d",
        components: {
            BoxHelper,
            GridHelper,
        },
        mixins: [event],
        props: {
            id: {type: String, default: 'Vue3D'},
            width: {type: Number, required: true},
            height: {type: Number, required: true},
            ratio: {type: Number, default: 1},

            // Vue3d Configs Object
            config: {type: Object},

            // plugins components
            plugins: {
                type: Object, default() {
                    return {
                        box: false,
                        grid: false,
                    }
                }
            }
        },
        data() {
            return {
                /* Vue3D Base Component */
                $_canvas: null, // canvas dom
                $_scene: null, // Base Scene
                $_camera: null, // Base Camera
                /* status */
                slot: false,
                background: null,
                conf: null,
                status: 'awake',
                /* libraries */
                renderer: null, // renderer
                orbit: null, // orbit control
                scenes: null, // scenes manager
            }
        },
        mounted() {
            this.conf = Bus.setConf(this.config); // 加载配置文件
            // 初始化基础组件
            this.$data.$_canvas = this.$el;
            this.$data.$_scene = new THREE.Scene();
            this.$data.$_camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.1, 5000);
            this.$data.$_scene.add(this.$data.$_camera);
            // 设置ID
            this.$data.$_scene.name = this.id;
            this.$data.$_camera.name = this.id;
            // 初始化 Vue3D Renderer
            this.renderer = new Renderer(this.$data.$_canvas, {});
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            this.$data.$_camera.position = new THREE.Vector3(0, 0, -500)
            // 初始化 Scenes Manager
            // this.scenes = new ScenesManager(this.$data.$_scene);
            // 初始化 Libraries
            // this.$data.$_camera.position.set(0, 0, 1000)
            this.orbit = new Orbit(this.$data.$_camera, this.$data.$_canvas);
            this.orbit.control.addEventListener('change', this.render, false);
            // 渲染第一帧
            this.renderer.setActive(this.$data.$_scene, this.$data.$_camera).render(() => {
                this.setStatus('start');
                this.slot = true;
            })

        },
        methods: {
            /**
             * 用于挂载时，获取Vue3d基础成员
             * @returns {{$_camera: any, $_canvas: any, $_scene: any}}
             */
            vue3d() {
                return {
                    $_canvas: this.$data.$_canvas,
                    $_scene: this.$data.$_scene,
                    $_camera: this.$data.$_camera,
                }
            },
            /**
             * 渲染一帧
             */
            render() {
                this.renderer.render(() => {
                    this.setStatus('render');
                    this.orbit.update();
                    this.emit("update"); // 向组件发送更新指令
                });
            },
            /**
             * 添加一个新场景
             * @param name
             * @returns {*}
             */
            add_scene(name) {
                return this.scenes.add(name)
            },
            /**
             * 获取当前激活的场景
             * @returns {never|*|Scene}
             */
            active_scene() {
                return this.scenes.active()
            },
            /**
             * 重置窗口大小
             */
            windowResize() {
                if (!this.renderer) return;
                this.renderer.setSize(this.width, this.height);
                this.renderer.setPixelRatio(this.ratio);
                // this.renderer.setActive(this.$data.$_scene, this.$data.$_camera);
                this.render();
            },
            /**
             * 设置当前状态
             * @param status
             */
            setStatus(status) {
                const status_enum = ['awake', 'start', 'render'];
                if (status_enum.indexOf(status) >= 0) {
                    this.status = status;
                    this.emit("status", this.status);
                }
            },
        },
        watch: {
            width(val, oldVal) {
                if (val === oldVal) return;
                this.windowResize();
            },
            height(val, oldVal) {
                if (val === oldVal) return;
                this.windowResize();
            },
            ratio(val, oldVal) {
                if (val === oldVal) return;
                this.windowResize();
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
