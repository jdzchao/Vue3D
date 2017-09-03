<template>
  <div id="XBoxGeometry">
  </div>
</template>
<script>
  const THREE = require('three');
  import _XCom from './_XCom.vue'

  export default {
    name: 'XBoxGeometry',
    mixins: [_XCom],
    data() {
      return {
        geometry: new THREE.BoxGeometry(100, 100, 100),
        material: new THREE.MeshBasicMaterial({color: 0x00ff00}),
        cube: null
      }
    },
    created() {
      this.cube = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.cube);
      this.render();
    }
  }
</script>
<style scoped>

</style>
