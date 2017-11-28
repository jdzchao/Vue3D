<template>
  <div id="XBoxGeometry">
  </div>
</template>
<script>
  import * as THREE from 'three'
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'XBoxGeometry',
    mixins: [Vue3D],
    props: {
      x: {type: Number, default: 100},
      y: {type: Number, default: 100},
      z: {type: Number, default: 100},
      color: {type: String, default: 'rgb(255,255,255)'}
    },
    data () {
      return {
        geometry: new THREE.BoxGeometry(this.x, this.y, this.z),
        material: new THREE.MeshBasicMaterial({color: this.color}),
        cube: null
      }
    },
    created () {
      this.cube = new THREE.Mesh(this.geometry, this.material);
      this.$vue3d.scene.add(this.cube);
      this.render();
    }
  }
</script>
<style scoped>

</style>
