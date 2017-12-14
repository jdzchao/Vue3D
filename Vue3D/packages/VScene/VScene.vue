<template>
  <canvas id="renderer" :width="width" :height="height">
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
    },
    data() {
      return {
        dom: null,
        scene: null,
        scene_size: 100,
        camera: null,
        renderer: null,
        rendererDelegation: [],
        rendererTick: null,
        ready: false,
      }
    },
    mounted() {
      this.dom = this.$el;
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true,
        antialias: true, // 抗锯齿
        alpha: true,
        canvas: this.dom
      });
      this.rendererDelegationAdd(this.updateRenderer);
      this.ready = true;
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
          console.error('Error Delegation Function');
        }
      },
      rendererDelegationRemove(func) {
        let index = this.rendererDelegation.indexOf(func);
        if (index >= 0) {
          this.rendererDelegation.slice(index, 1);
        } else {
          console.warn('Function is not found in delegation');
        }
      },
      getObjectSize(object) {
        let box = new THREE.Box3();
        box.setFromObject(object);
        return box.getSize();
      },
      placeZeroPoint(object) {
        let box = new THREE.Box3();
        box.setFromObject(object);
        let center = box.getCenter();
        object.position.x -= center.x;
        object.position.y -= center.y;
        object.position.z -= center.z;
        return center;
      },
      adaptScale(object) {
        let scale = 1;
        let aspect = this.width / this.height;
        let size = this.getObjectSize(object);
        if (size.x / size.y > aspect) {
          scale *= this.scene_size / size.x;
          size.multiplyScalar(scale);
        } else {
          scale *= aspect > 1 ? this.scene_size / size.y : this.scene_size / size.y / aspect;
          size.multiplyScalar(scale);
        }
        if (size.z > this.scene_size) {
          scale *= this.scene_size / size.z;
          size.multiplyScalar(scale);
        }
        object.scale.set(scale, scale, scale);
        return scale;
      }
    }
  }
</script>

