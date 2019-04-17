<template>
    <canvas v-bind="$attrs">
        Sorry, your web browser does not support WebGL
        <stand-scene v-if="start">
            <slot name="hierarchy"></slot>
        </stand-scene>
        <slot v-if="start" name="v4h"></slot>
    </canvas>
</template>

<script>
    import * as THREE from 'three'
    import Renderer from "../../renderer";
    import StandScene from "./StandardScene";

    export default {
        name: "V3dScene",
        components: {StandScene},
        props: {
            width: {type: Number, default: 50},
            height: {type: Number, default: 50},
            backgroundColor: {type: String, default: 'rgb(0,0,0)'}, // 背景色
            backgroundAlpha: {type: Number, default: 1}, // 背景透明度
            buffer: {type: Boolean, default: true}, //绘图缓冲
            antialias: {type: Boolean, default: true}, // 抗锯齿
            alpha: {type: Boolean, default: true},
        },
        data() {
            return {
                /* protected */
                V$dom: null,
                V$scene: null, // root scene
                V$cameras: null, // Array Camera
                /* public */
                scene: null, // standard scene
                cameras: [], // Camera Array
                renderer: null,
                /* status */
                start: false,
            }
        },
        mounted() {
            this.init(); // 初始化
            Vue3d.render(); // 开始渲染
            Vue3d.$on("update", this.updateRenderer);
            Vue3d.$on("add-camera", this.addCamera);
        },
        updated() {
            if (this.cameras) {
                Vue3d.render();
            } else {
                console.error("No cameras rendering")
            }
        },
        methods: {
            init() {
                this.V$dom = this.$el;
                this.V$scene = new THREE.Scene();
                this.V$cameras = new THREE.ArrayCamera(this.cameras);
                this.scene = new THREE.Scene();
                this.V$scene.add(this.scene);
                // 加载渲染器
                this.renderer = new THREE.WebGLRenderer({
                    preserveDrawingBuffer: this.buffer, //绘图缓冲
                    antialias: this.antialias, // 抗锯齿
                    alpha: this.alpha,
                    canvas: this.V$dom
                });
                this.start = true;
            },
            updateRenderer() {
                this.renderer.setSize(this.width, this.height);
                this.renderer.setPixelRatio(window.devicePixelRatio || 1);
                this.renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
                this.renderer.setClearAlpha(this.backgroundAlpha);
                Vue3d.getPure() ? this.renderer.render(this.scene, this.V$cameras) : this.renderer.render(this.V$scene, this.V$cameras);
            },
            addCamera(camera) {
                this.cameras.push(camera);
            }
        }
    }
</script>
