<script>
  const THREE = require('three');
  import XMixin from '../../mixins/XMixin'

  export default {
    name: 'x-light',
    mixins: [XMixin],
    props: {
      type: {type: String, default: 'Ambient'},  // Ambient 环境光; Directional 平行光
      color: {type: String, default: 'rgb(255,255,255)'},
      intensity: {type: Number, default: 1.0},
      width: {type: Number, default: 100},
      height: {type: Number, default: 100}
    },
    created() {
      switch (this.type) {
        case 'Ambient':
          this.object3d = new THREE.AmbientLight(this.color, this.intensity);
          break;
        case 'Directional':
          this.object3d = new THREE.DirectionalLight(this.color, this.intensity);
          break;
        case 'RectArea':
          this.object3d = new THREE.RectAreaLight(this.color, this.intensity, this.width, this.height);
          let rectLightHelper = new THREE.RectAreaLightHelper(this.object3d);
          this.object3d.position.set(0, 0, 100);
          this.object3d.lookAt(0, 0, 0);
          this.root.scene.add(rectLightHelper);
          break;
      }
    }
  }
</script>
