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
    import Bus from "../bus"
    // Mixins
    import event from "./Mixins/event"
    // Libraries
    import Renderer from "./Libraries/renderer"
    import ScenesManager from "./Libraries/scenes";
    import Orbit from "./Libraries/orbit";
    import Capture from "./Libraries/capture"

    export default {
        name: "Vue3d",
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
                $_canvas: null, // _canvas dom
                $_scene: null, // Base Scene
                $_camera: null, // Base Camera
                /* status */
                slot: false,
                $_play: false,
                $_status: 'awake',
                /* libraries */
                renderer: null, // renderer
                orbit: null, // orbit control
                scenes: null, // _scenes manager
                /* config */
                conf: null,
                background: null,
            }
        },
        computed: {
            play: {
                get() {
                    return this.$data.$_play;
                },
                set(val) {
                    this.$data.$_play = val;
                    this.orbit.enabled = !val;
                    if (val) {
                        this.renderer.setActive(this.activated_scene(), this.activated_scene().arrayCamera);
                    } else {
                        this.renderer.setActive(this.$data.$_scene, this.$data.$_camera);
                    }
                    this.emit("play", val);
                }
            },
            status: {
                get() {
                    return this.$data.$_status;
                },
                set(val) {
                    const status_enum = ['awake', 'start', 'render'];
                    if (status_enum.indexOf(val) >= 0) {
                        this.$data.$_status = val;
                        this.emit("status", val);
                    }
                }
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
            this.renderer = new Renderer(this.$data.$_canvas, this.conf.renderer);
            // 初始化 Scenes Manager
            this.scenes = new ScenesManager(this.$data.$_scene);
            // 初始化 Orbit Controller
            this.orbit = new Orbit(this.$data.$_camera, this.$data.$_canvas);
            this.orbit.control.addEventListener('change', this.render, false);
            // 初始化 Capture
            this.capture = new Capture(
                this.$data.$_canvas,
                this.$data.$_camera,
                this.scenes, // 场景管理器
                this.onCapture
            );
            // 渲染第一帧
            this.renderer.setActive(this.$data.$_scene, this.$data.$_camera).render(() => {
                this.slot = true;
                this.status = 'start';
                this.$emit('success');
            });
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
            render(callback) {
                this.renderer.render(() => {
                    this.status = 'render';
                    if (typeof callback === "function") callback();
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
            activated_scene() {
                return this.scenes.activated()
            },
            /**
             * 重置窗口大小
             */
            resize() {
                if (!this.renderer) return;
                this.renderer.setSize(this.width, this.height).setAspect();
                this.renderer.setPixelRatio(this.ratio);
                // this.renderer.setActive(this.$data.$_scene, this.$data.$_camera);
                this.render();
            },
            /**
             * 获取点击捕获的目标
             * @param object3d
             */
            onCapture(object3d) {
                this.emit('capture', object3d)
                console.log(object3d)
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
