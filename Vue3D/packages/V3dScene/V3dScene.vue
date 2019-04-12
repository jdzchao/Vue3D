<template>
    <canvas :id="id">
        <slot v-if="ready"></slot>
        Sorry, your web browser does not support WebGL
    </canvas>
</template>

<script>
    import * as THREE from 'three'
    import {Bus} from "_v3d/index";

    export default {
        name: "V3dScene",
        props: {
            id: {type: String, default: 'V3dScene'},
            width: {type: Number, default: 50},
            height: {type: Number, default: 50},
            backgroundColor: {type: String, default: 'rgb(0,0,0)'}, // 背景色
            backgroundAlpha: {type: Number, default: 1}, // 背景透明度
            buffer: {type: Boolean, default: true}, //绘图缓冲
            antialias: {type: Boolean, default: true}, // 抗锯齿
            alpha: {type: Boolean, default: true},
            autoRender: {type: Boolean, default: false},
        },
        data() {
            return {
                dom: null,
                scene: null,
                renderer: null,
                rendererDelegation: [],
                rendererTick: null,
                cameras: [],
                camera: null,
                ready: false,
            }
        },
        mounted() {
            this.dom = this.$el;
            this.scene = new THREE.Scene();
            this.camera = new THREE.ArrayCamera(this.cameras);
            this.renderer = new THREE.WebGLRenderer({
                preserveDrawingBuffer: this.buffer, //绘图缓冲
                antialias: this.antialias, // 抗锯齿
                alpha: this.alpha,
                canvas: this.dom
            });
            this.rendererDelegationAdd(this.updateRenderer);
            this.ready = true;
            this.$emit('ready', this.scene);
            Bus.$on("render", this.render);
        },
        updated() {
            if (this.camera) {
                this.render();
            } else {
                console.error("No cameras rendering")
            }
        },
        methods: {
            debug(obj) {
                console.log(obj)
            },
            render() {
                if (this.rendererDelegation.length < 1) return;
                if (this.rendererTick) return;
                this.rendererTick = requestAnimationFrame(() => {
                    this.rendererTick = null;
                    this.rendererDelegation.forEach((func) => {
                        func();
                    });
                    this.renderer.render(this.scene, this.camera);
                    if (this.autoRender) {
                        this.render();
                    }
                })
            },
            updateRenderer() {
                this.renderer.setSize(this.width, this.height);
                this.renderer.setPixelRatio(window.devicePixelRatio || 1);
                this.renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
                this.renderer.setClearAlpha(this.backgroundAlpha);
            },
            rendererDelegationAdd(func) {
                if (typeof func === 'function') {
                    this.rendererDelegation.push(func);
                } else {
                    console.error('error type function');
                }
            },
            rendererDelegationRemove(func) {
                let index = this.rendererDelegation.indexOf(func);
                if (index >= 0) {
                    this.rendererDelegation.slice(index, 1);
                } else {
                    console.warn('function is not found in the delegation');
                }
            }
        }
    }
</script>
