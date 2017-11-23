<template>
  <canvas id="MRenderer" class="renderer"></canvas>
</template>
<script>
  const THREE = require('three');
  import _MCom from './_MCom.vue'

  export default {
    name: 'MRenderer',
    mixins: [_MCom],
    props: {
      height: Number,
      width: Number,
    },
    data() {
      return {
        backgroundColor: 0x000000,
        backgroundAlpha: 1,
      }
    },
    mounted() {
      this.$store.state.vue3d.renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true,
        canvas: this.$el
      });
      this.$store.commit('vue3d/rendererDelegation', this.updateRenderer);
      this.$store.state.vue3d.dom = this.$el;
      this.render();
      this.$emit('ready', true);
    },
    methods: {
      updateRenderer() {
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
        this.renderer.setClearAlpha(this.backgroundAlpha);
      },
    }
  }
</script>
