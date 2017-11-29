<template></template>
<script>
  const THREE = require('three');

  export default {
    data() {
      return {
        scene: '',
      }
    },
    created() {
      if (!this.$vue3d.scene) {
        this.$vue3d.scene = new THREE.Scene();
      }
    },
    methods: {
      render() {
        this.scene = this.$vue3d.scene;
        this.$vue3d.render();
      }
    }
  }
</script>
