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
      enable: {type: Boolean, default: true},
    },
    data() {
      return {
        control: null
      }
    },
    mounted() {
      this.control = new THREE.OrbitControls(this.root.camera, this.root.dom);
      this.control.addEventListener('change', this.root.render, false);
      this.control.type = 'orbit';
      this.control.minDistance = this.min;
      this.control.maxDistance = this.max;
      this.control.enabled = this.enable;
      this.root.rendererDelegationAdd(this.updateControls);
    },
    watch: {
      enable(val) {
        this.control.enabled = this.enable;
      }
    },
    methods: {
      updateControls() {
        this.control.update();
      },
    }
  }
</script>
