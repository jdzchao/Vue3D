<template>
  <div id="XBoxGeometry" style="display:none;">
    <slot v-if="slot"></slot>
  </div>
</template>
<script>
  const THREE = require('three');
  import XMixin from '../_mixins/XMixin'

  export default {
    name: 'x-box-geometry',
    mixins: [XMixin],
    props: {
      x: {type: Number, default: 100},
      y: {type: Number, default: 100},
      z: {type: Number, default: 100},
      material: {type: Object},
    },
    data() {
      return {
        geometry: new THREE.BoxGeometry(this.x, this.y, this.z),
        object3d: null,
      }
    },
    mounted() {
      this.setCube();
      this.slotIn();
    },
    watch: {
      object3d(val, oldVal) {
        if (oldVal !== null)
          this.remove3d(oldVal);
        this.add3d(val);
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
          this.object3d = new THREE.Mesh(this.geometry, this.material);
        }
      }
    }
  }
</script>
