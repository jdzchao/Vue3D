<template>
  <div id="WOrbitControls" style="display:none;"></div>
</template>
<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!./OrbitControls');
  import WMixin from '../_mixins/WMixin'

  export default {
    name: 'w-orbit-controls',
    mixins: [WMixin],
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
      this.root.rendererDelegationAdd(this.updateControls);
    },
    methods: {
      updateControls() {
        if (this.controls) return;
        this.controls = new THREE.OrbitControls(this.root.camera, this.root.dom);
        this.controls.addEventListener('change', this.render, false);
        this.controls.type = 'orbit';
        this.controls.minDistance = this.min;
        this.controls.maxDistance = this.max;
      },
    }
  }
</script>
