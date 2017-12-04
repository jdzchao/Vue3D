<template>
  <div id="XBoxGeometry"></div>
</template>
<script>
  const THREE = require('three');
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'x-box-geometry',
    mixins: [Vue3D],
    props: {
      x: {type: Number, default: 100},
      y: {type: Number, default: 100},
      z: {type: Number, default: 100},
      material: {type: Object},
    },
    data() {
      return {
        geometry: new THREE.BoxGeometry(this.x, this.y, this.z),
        cube: null
      }
    },
    created() {
      console.log(this.material);
      if (!this.material) {
        this.material = new THREE.MeshBasicMaterial();
      }
      this.cube = new THREE.Mesh(this.geometry, this.material);
      this.$vue3d.scene.add(this.cube);
      this.render();
    },
    watch: {
      material(val, oldVal) {
        if (oldVal !== val && oldVal !== null) {
          this.setMaterial();
        }
      }
    },
    methods: {
      setMaterial() {
        if (this.cube && this.material) {
          this.cube.material = this.materials;
        }
      }
    }
  }
</script>
<style scoped>

</style>
