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
      group: {type: Object}
    },
    data() {
      return {
        _group: {},
        geometry: new THREE.BoxGeometry(this.x, this.y, this.z),
        cube: null,
      }
    },
    created() {
      if (!this.group) {
        this._group = this.$vue3d.scene;
      }
    },
    mounted() {
      if (!this.material) {
        this.material = new THREE.MeshBasicMaterial();
      }
    },
    watch: {
      cube(val, oldVal) {
        if (oldVal !== null)
          this._group.remove(oldVal);
        this._group.add(val);
        this.render();
      },
      material(val, oldVal) {
        if (oldVal !== val && oldVal !== null) {
          this.setMaterial();
        }
      }
    },
    methods: {
      setCube() {
        this.cube = new THREE.Mesh(this.geometry, this.material);
      },
      setMaterial() {
        if (this.cube && this.material) {
          this.cube = new THREE.Mesh(this.geometry, this.material);
        }
      }
    }
  }
</script>
<style scoped>

</style>
