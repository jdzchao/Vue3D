<template>
  <div title="WOrbitControls" style="display:none;"></div>
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
        control: null
      }
    },
    created() {
      this.root.rendererDelegationAdd(this.updateControls);
    },
    methods: {
      updateControls() {
        if (this.control) return;
        this.control = new THREE.OrbitControls(this.root.camera, this.root.dom);
        this.control.addEventListener('change', this.render, false);
        this.control.type = 'orbit';
        this.control.minDistance = this.min;
        this.control.maxDistance = this.max;
      },
    }
  }
</script>
