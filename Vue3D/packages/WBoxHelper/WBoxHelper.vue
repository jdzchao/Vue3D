<script>
  const THREE = require('three');
  import WMixin from '../../mixins/WMixin'

  export default {
    name: "w-box-helper",
    mixins: [WMixin],
    props: {
      target: {type: Object},
      color: {type: String, default: 'rgb(255,255,0)'}
    },
    data() {
      return {
        box: new THREE.BoxHelper(),
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 1, y: 1, z: 1},
      }
    },
    watch: {
      target(val) {
        if (val) {
          this.position = val.position;
          this.rotation = val.rotation;
          this.scale = val.scale;
          this.box.setFromObject(this.target);
          this.root.scene.add(this.box);
          this.update();
        } else {
          this.root.scene.remove(this.box);
        }
      },
      color(val) {
        if (val) {
          this.box.color = val;
        }
      },
      position: {
        deep: true,
        handler(val, oldVal) {
          if (!this.target) return;
          this.update();
        }
      },
      rotation: {
        deep: true,
        handler(val, oldVal) {
          if (!this.target) return;
          this.update();
        }
      },
      scale: {
        deep: true,
        handler(val, oldVal) {
          if (!this.target) return;
          this.update();
        }
      },
    },
    methods: {
      update() {
        this.box.update();
      }
    }
  }
</script>
