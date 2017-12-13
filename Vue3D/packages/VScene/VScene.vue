<template>
  <div id="VScene">
    <canvas :width="width" :height="height"></canvas>
    <slot></slot>
  </div>
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
    },
    data() {
      return {
        scene: null,
        camera: null,
        renderer: null,
        rendererDelegation: [],
        tick: null,
        ready: false
      }
    },
    created() {
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true,
        antialias: true, // 抗锯齿
        alpha: true,
        canvas: this.$el
      });
      this.rendererDelegationAdd(this.updateRenderer);
      this.ready = true;
      this.render();
    },
    mounted() {
    },
    methods: {
      render() {
        if (this.rendererDelegation.length < 1) return;
        if (this.tick) return;
        this.tick = requestAnimationFrame(() => {
          this.tick = null;
          this.rendererDelegation.forEach((func) => {
            func();
          });
          this.renderer.render(this.scene, this.camera);
        })
      },
      updateRenderer() {
        console.log("render");
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
        this.renderer.setClearAlpha(this.backgroundAlpha);
      },
      rendererDelegationAdd(func) {
        if (typeof func === 'function') {
          this.rendererDelegation.push(func);
        } else {
          console.debug('Error Delegation Function');
        }
      },
      rendererDelegationRemove(func) {
        let index = this.rendererDelegation.indexOf(func);
        if (index >= 0) {
          this.rendererDelegation.slice(index, 1);
        } else {
          console.debug('Error Delegation Function');
        }
      }
    }
  }
</script>

