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
        mouse: new THREE.Vector2()
      }
    },
    created() {
      this.root.dom.addEventListener('click', this.caster, false);
    },
    methods: {
      caster(event) {
        this.mouse.x = (event.clientX / this.root.dom.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.root.dom.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.root.camera);
        this.raycaster.intersectObjects(this.root.scene.children);
        console.log(this.raycaster.intersectObjects(this.root.scene.children), this.root.scene.children)
      }
    }
  }
</script>

<style scoped>

</style>
