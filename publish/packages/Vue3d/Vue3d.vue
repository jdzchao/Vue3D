<template>
    <canvas :id="id">
        Sorry, your web browser does not support WebGL
        <template v-if="slot">
            <box-helper v-bind="config.box" v-if="plugins.box"></box-helper>
            <grid-helper v-bind="config.grid" v-if="plugins.grid"></grid-helper>
            <slot></slot>
        </template>
    </canvas>
</template>

<script>
    import * as THREE from 'three'
    import Bus from "../../bus"
    import Renderer from "../../renderer";
    import BoxHelper from "./Plugins/BoxHelper"
    import GridHelper from "./Plugins/GridHelper"
    import Scene_SkyBox from "../../mixins/Scene_SkyBox"

    export default {
        name: "Vue3d",
        components: {
            BoxHelper,
            GridHelper,
        },
        mixins: [Scene_SkyBox],
        props: {
            id: {type: String, default: 'Vue3D'},
            width: {type: Number, default: 500},
            height: {type: Number, default: 500},
            ratio: {type: Number, default: 0},

            // Vue3d Configs Object
            config: {type: Object},

            // helper components
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
                /* public */
                renderer: null, // Vue3D Renderer Bus
                scene: null, // activate scene
                /* status */
                slot: false,
                background: null,
            }
        },
        methods: {
            // 获取基础挂载对象
            fetch_base() {
                return {
                    $_canvas: this.$data.$_canvas,
                    $_scene: this.$data.$_scene,
                    $_camera: this.$data.$_camera,
                    renderer: this.renderer
                }
            },
            resize() {
                if (!this.renderer) return;
                this.renderer.setSize(this.width, this.height, true);
            }
        },
        mounted() {
            Bus.loadConf(this.config); // 加载配置文件
            // 初始化基础组件
            this.$data.$_canvas = this.$el;
            this.$data.$_scene = new THREE.Scene();
            this.$data.$_camera = new THREE.PerspectiveCamera(45, this.width / this.height);
            // 设置ID
            this.$data.$_scene.name = this.id;
            this.$data.$_camera.name = this.id;
            // 初始化 Vue3D Renderer
            this.renderer = new Renderer().init(
                this.$data.$_canvas,
                this.$data.$_scene,
                this.$data.$_camera,
                this.config.hasOwnProperty('renderer') ? this.config['renderer'] : {}, // 读取配置文件
                // callback
                res => {
                    this.scene = res.scene;
                    this.cameras = res.cameras;
                    // 开始加载子组件
                    this.slot = true;
                    this.resize();
                });
        },
        watch: {
            width(val, oldVal) {
                if (val === oldVal || !this.slot) return;
                this.resize();
            },
            height(val, oldVal) {
                if (val === oldVal || !this.slot) return;
                this.resize();
            },
            ratio(val, oldVal) {
                if (val === oldVal || !this.slot) return;
                this.renderer.setPixelRatio(this.ratio, true);
            },
            background(val, oldVal) {
                if (val === oldVal) return;
                this.$data.$_scene.background = val;
                this.scene.background = val;
                this.renderer.render();
            }
        }
    }
</script>
