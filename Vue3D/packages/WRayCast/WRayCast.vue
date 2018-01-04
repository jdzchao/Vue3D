<template>
  <div title="WRaycast" style="display:none;"></div>
</template>

<script>
  const THREE = require('three');
  import WMixin from '../_mixins/WMixin'

  export default {
    name: "w-raycast",
    mixins: [WMixin],
    props: {
      near: {type: Number, default: 0},
      far: {type: Number, default: 0},
    },
    data() {
      return {
        raycaster: new THREE.Raycaster(),
        mouse: new THREE.Vector2(),
        target: [],
        charged: false,
      }
    },
    created() {
      this.root.dom.addEventListener('mousedown', this.charge, false);
      this.root.dom.addEventListener('mousemove', this.leakage, false);
      this.root.dom.addEventListener('mouseup', this.caster, false);
      if (this.near) {
        this.raycaster.near = this.near;
      }
      if (this.far && this.far > this.near) {
        this.raycaster.far = this.far;
      }
    },
    watch: {
      near(val) {
        this.raycaster.near = val;
      },
      far(val) {
        if (val > this.near) {
          this.raycaster.far = val;
        }
      }
    },
    methods: {
      caster(event) {
        if (!this.charged) return;
        this.mouse.x = (event.clientX / this.root.dom.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.root.dom.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.root.camera);
        this.target = this.raycaster.intersectObjects(this.root.scene.children, true);
        this.$emit('cast', this.target);
        this.charged = true;
      },
      charge() {
        this.charged = true;
      },
      leakage() {
        this.charged = false;
      }
    }
  }
</script>

<style scoped>

</style>
