<template>
  <div id="XBoxGeometry">
  </div>
</template>
<script>
  const THREE = require('three');
  import _VC from './_VComponent.vue'

  export default {
    name: 'XBoxGeometry',
    mixins: [_VC],
    data() {
      return {
        geometry: new THREE.BoxGeometry(100, 100, 100),
        material: new THREE.MeshBasicMaterial({color: 0x00ff00}),
        cube: null
      }
    },
    created() {
      this.cube = new THREE.Mesh(this.geometry, this.material);
      this.$store.state.scene.add(this.cube);
    }
  }
</script>
<style scoped>

</style>
