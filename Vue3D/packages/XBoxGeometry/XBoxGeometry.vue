<template>
  <div id="XBoxGeometry" style="display:none;"></div>
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
        cube: null,
      }
    },
    mounted() {
      this.setCube();
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
          this.setCube();
        }
      }
    },
    methods: {
      setCube() {
        if (this.geometry) {
          this.cube = new THREE.Mesh(this.geometry, this.material);
        }
      }
    }
  }
</script>
