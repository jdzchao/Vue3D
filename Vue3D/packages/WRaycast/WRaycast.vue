<template>
  <div title="WRaycast" style="display:none;"></div>
</template>

<script>
  const THREE = require('three');
  import WMixin from '../_mixins/WMixin'

  export default {
    name: "w-raycast",
    mixins: [WMixin],
    data() {
      return {
        raycaster: new THREE.Raycaster(),
        mouse: new THREE.Vector2(),
        target: [],
        isClick: false,
      }
    },
    created() {
      this.root.dom.addEventListener('mousedown', this.mouseLock, false);
      this.root.dom.addEventListener('mousemove', this.dragLock, false);
      this.root.dom.addEventListener('mouseup', this.caster, false);
    },
    methods: {
      caster(event) {
        if (!this.isClick) return;
        this.mouse.x = (event.clientX / this.root.dom.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.root.dom.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.root.camera);
        this.target = this.raycaster.intersectObjects(this.root.scene.children, true);
        this.$emit('cast', this.target);
        this.isClick = true;
      },
      mouseLock() {
        this.isClick = true;
      },
      dragLock() {
        this.isClick = false;
      }
    }
  }
</script>

<style scoped>

</style>
