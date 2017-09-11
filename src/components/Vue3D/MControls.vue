<template>
  <div id="MControls"></div>
</template>
<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../../node_modules/three/examples/js/controls/OrbitControls');
  import _MCom from './_MCom.vue'

  export default {
    name: 'MControls',
    mixins: [_MCom],
    data() {
      return {
        min: 10,
        max: 500,
      }
    },
    mounted() {
      this.$store.commit('vue3d/rendererDelegation', this.updateControls);
    },
    methods: {
      updateControls() {
        if (this.controls) return;
        this.controls = new THREE.OrbitControls(this.camera, this.$store.state.vue3d.dom);
        this.controls.addEventListener('change', this.render, false);
        this.controls.type = 'orbit';
        this.controls.minDistance = this.min;
        this.controls.maxDistance = this.max;
      },
    }
  }
</script>
