<template>
  <div id="MOrbitControls" style="display:none;"></div>
</template>
<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!./OrbitControls');
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'm-orbit-controls',
    mixins: [Vue3D],
    props: {
      min: {type: Number, default: 10},
      max: {type: Number, default: 500},
    },
    data() {
      return {
        controls: null
      }
    },
    created() {
      this.$vue3d.rendererDelegationAdd(this.updateControls);
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
