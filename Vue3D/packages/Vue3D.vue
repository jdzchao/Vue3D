<template></template>
<script>
  import * as THREE from 'three'

  export default {
    data () {
      return {}
    },
    created () {
      if (!this.$vue3d.scene) {
        this.$vue3d.scene = new THREE.Scene();
      }
    },
    computed: {
      scene () {
        return this.$vue3d.scene;
      },
      camera () {
        console.log(this.$vue3d.camera.position);
        return this.$vue3d.camera;
      },
      renderer () {
        return this.$vue3d.renderer;
      }
    },
    methods: {
      render () {
        console.log(this.camera);
        this.$vue3d.render();
      }
    }
  }
</script>
