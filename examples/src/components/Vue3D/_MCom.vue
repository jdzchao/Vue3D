<template></template>
<script>
  const THREE = require('three');
  import {mapState} from 'vuex';

  export default {
    data() {
      return {}
    },
    created() {
      if (!this.scene) {
        this.$store.state.vue3d.scene = new THREE.Scene();
      }
    },
    computed: {
      ...mapState({
        scene: state => state.vue3d.scene,
        camera: state => state.vue3d.camera,
        renderer: state => state.vue3d.renderer,
      })
    },
    methods: {
      render() {
        this.$store.commit('vue3d/render');
      }
    }
  }
</script>
