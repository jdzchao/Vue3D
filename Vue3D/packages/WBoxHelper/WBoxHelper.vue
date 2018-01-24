<template>
  <object name="WBoxHelper" style="display:none;"></object>
</template>

<script>
  const THREE = require('three');
  import WMixin from '../_mixins/WMixin'

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
          this.root.scene.add(this.box);
          this.setBox();
        } else {
          this.root.scene.remove(this.box);
        }
      },
      position: {
        deep: true,
        handler(val, oldVal) {
          if (!this.target) return;
          this.setBox();
        }
      },
      rotation: {
        deep: true,
        handler(val, oldVal) {
          if (!this.target) return;
          this.setBox();
        }
      },
      scale: {
        deep: true,
        handler(val, oldVal) {
          if (!this.target) return;
          this.setBox();
        }
      },
    },
    methods: {
      setBox() {
        this.box.setFromObject(this.target);
      }
    }
  }
</script>
