<template></template>
<script>
  import * as THREE from 'three'

  export default {
    data() {
      return {}
    },
    created() {
      if (!this.$vue3d.scene) {
        this.$vue3d.scene = new THREE.Scene();
      }
    },
    methods: {
      render() {
        this.$vue3d.render();
      }
    }
  }
</script>
