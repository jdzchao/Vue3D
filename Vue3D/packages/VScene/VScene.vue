<template>
  <canvas title="VScene">
    <slot v-if="ready"></slot>
  </canvas>
</template>

<script>
  const THREE = require('three');
  export default {
    name: "v-scene",
    props: {
      width: {type: Number, default: 50},
      height: {type: Number, default: 50},
      backgroundColor: {type: String, default: 'rgb(0,0,0)'},
      backgroundAlpha: {type: Number, default: 1},
      buffer: {type: Boolean, default: true},
      antialias: {type: Boolean, default: true},
      alpha: {type: Boolean, default: true},
      auto: {type: Boolean, default: false},
    },
    data() {
      return {
        dom: null,
        scene: null,
        renderer: null,
        rendererDelegation: [],
        rendererTick: null,
        camera: null,
        ready: false,
      }
    },
    mounted() {
      this.dom = this.$el;
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: this.buffer, //绘图缓冲
        antialias: this.antialias, // 抗锯齿
        alpha: this.alpha,
        canvas: this.dom
      });
      this.rendererDelegationAdd(this.updateRenderer);
      this.ready = true;
    },
    update() {
      this.render();
    },
    methods: {
      render() {
        if (this.rendererDelegation.length < 1) return;
        if (this.rendererTick) return;
        this.rendererTick = requestAnimationFrame(() => {
          this.rendererTick = null;
          this.rendererDelegation.forEach((func) => {
            func();
          });
          this.renderer.render(this.scene, this.camera);
          if (this.auto) {
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

