<template>
    <canvas v-bind="$attrs">
        Sorry, your web browser does not support WebGL
        <stand-scene v-if="slot">
            <slot name="hierarchy"></slot>
        </stand-scene>
        <slot v-if="slot" name="helper"></slot>
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
            alpha: {type: Boolean, default: true},// canvas 是否透明
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
                slot: false,
            }
        },
        mounted() {
            this.renderer = new Renderer();
            this.renderer.init({
                id: this.$attrs.id || "",
                dom: this.$el,
                antialias: this.antialias, // 抗锯齿
                alpha: this.alpha, //
                buffer: this.buffer, //绘图缓冲
            }, (res) => {
                this.V$dom = res.dom;
                this.V$scene = res._$scene;
                this.scene = res.scene;
                this.cameras = res.cameras;
                this.slot = true; // 开始挂在子组件
            }); // 初始化
            this.renderer.$on("reset-renderer", this.resetRenderer);
        },
        methods: {
            resetRenderer() {
                this.renderer.setSize(this.width, this.height);
                this.renderer.setPixelRatio(window.devicePixelRatio || 1);
                this.renderer.setClearColor(this.backgroundColor);
                this.renderer.setClearAlpha(this.backgroundAlpha);
                this.renderer.render();
            },
        }
    }
</script>
