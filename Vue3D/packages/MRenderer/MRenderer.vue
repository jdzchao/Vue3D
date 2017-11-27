<template>
  <canvas id="MRenderer" class="renderer"></canvas>
</template>
<script>
  import * as THREE from 'three'
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'MRenderer',
    mixins: [Vue3D],
    props: {
      height: Number,
      width: Number,
    },
    data () {
      return {
        backgroundColor: 0x000000,
        backgroundAlpha: 1,
      }
    },
    mounted () {
      this.$vue3d.renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true,
        canvas: this.$el
      });
      this.$vue3d.rendererDelegationReg(this.updateRenderer);
      this.$vue3d.dom = this.$el;
      this.render();
      this.$emit('ready', true);
    },
    methods: {
      updateRenderer () {
        this.$vue3d.renderer.setSize(this.width, this.height);
        this.$vue3d.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.$vue3d.renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
        this.$vue3d.renderer.setClearAlpha(this.backgroundAlpha);
      },
    }
  }
</script>
