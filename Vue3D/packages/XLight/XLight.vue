<template>
  <div id="XLight" style="display:none;">
    <slot v-if="slot"></slot>
  </div>
</template>
<script>
  const THREE = require('three');
  import XMixin from '../_mixins/XMixin'

  export default {
    name: 'x-light',
    mixins: [XMixin],
    props: {
      type: {type: String, default: 'Ambient'},  // Ambient 环境光; Directional 平行光
      color: {type: String, default: 'rgb(255,255,255)'},
      intensity: {type: Number, default: 1.0},
    },
    data() {
      return {
        light: {},
      }
    },
    created() {
      switch (this.type) {
        case 'Ambient':
          this.object3d = new THREE.AmbientLight(this.color, this.intensity);
          break;
        case 'Directional':
          this.object3d = new THREE.DirectionalLight(this.color, this.intensity);
      }
      this.add3d(this.object3d);
      this.slotIn();
      this.render();
    }
  }
</script>
