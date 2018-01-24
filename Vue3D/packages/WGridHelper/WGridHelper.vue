<template>
  <object name="WGridHelper" style="display:none;"></object>
</template>

<script>
  const THREE = require('three');
  import WMixin from '../_mixins/WMixin'

  export default {
    name: "w-grid-helper",
    mixins: [WMixin],
    props: {
      size: {type: Number, default: 1000},
      divisions: {type: Number, default: 10},
      colorCenterLine: {type: String, default: 'rgb(136,136,136)'},
      colorGrid: {type: String, default: 'rgb(68,68,68)'},
    },
    data() {
      return {
        helper: null
      }
    },
    mounted() {
      this.helper = new THREE.GridHelper(this.size, this.divisions, this.colorCenterLine, this.colorGrid);
      this.root.scene.add(this.helper);
    }
  }
</script>
