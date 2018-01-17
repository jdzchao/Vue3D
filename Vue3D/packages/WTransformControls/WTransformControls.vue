<template>
  <div title="WTransformControls" style="display:none;"></div>
</template>

<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.TransformControls!./TransformControls');
  import WMixin from '../_mixins/WMixin'

  export default {
    name: "w-transform-controls",
    mixins: [WMixin],
    props: {
      mesh: {type: Object}
    },
    data() {
      return {
        blacklist: ['XY', 'XZ', 'YZ', 'XYZE'],
        control: null,
      }
    },
    mounted() {
      this.control = new THREE.TransformControls(this.root.camera, this.root.dom);
      this.control.addEventListener('change', this.renderControl);
      this.root.scene.add(this.control);
    },
    watch: {
      mesh(val) {
        if (val && val.type === 'Mesh' && this.blacklist.indexOf(val.name) < 0) {
          this.setAttach();
        } else {
          this.control.detach();
        }
      }
    },
    methods: {
      setAttach() {
        this.control.attach(this.mesh);
      },
      renderControl() {
        this.control.update();
        this.render();
      }
    }
  }
</script>
