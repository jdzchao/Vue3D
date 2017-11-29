<template>
  <div id="MControls"></div>
</template>
<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!./OrbitControls');
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'MControls',
    mixins: [Vue3D],
    data() {
      return {
        controls: null,
        min: 10,
        max: 500,
      }
    },
    created() {
      this.$vue3d.rendererDelegationReg(this.updateControls);
    },
    methods: {
      updateControls() {
        if (this.controls) return;
        this.controls = new THREE.OrbitControls(this.$vue3d.camera, this.$vue3d.dom);
        this.controls.addEventListener('change', this.render, false);
        this.controls.type = 'orbit';
        this.controls.minDistance = this.min;
        this.controls.maxDistance = this.max;
      },
    }
  }
</script>
