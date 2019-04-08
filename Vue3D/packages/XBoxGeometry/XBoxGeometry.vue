<script>
  const THREE = require('three');
  import XMixin from '../../mixins/XMixin'

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
        material_: {}
      }
    },
    mounted() {
      this.setCube(this.material);
    },
    watch: {
      material(val, oldVal) {
        if (oldVal !== val && oldVal !== null) {
          this.setCube(val);
        }
      },
      material_(val, oldVal) {
        if (oldVal !== val && oldVal !== null) {
          console.log(1);
          this.setCube(val);
        }
      },
    },
    methods: {
      setCube(mtl) {
        if (this.geometry) {
          this.object3d = new THREE.Mesh(this.geometry, mtl);
        }
      }
    }
  }
</script>
