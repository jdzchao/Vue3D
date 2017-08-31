<template>
  <div id="XLight">
  </div>
</template>
<script>
  const THREE = require('three');
  export default {
    name: 'XLight',
    props: {
      type: String,
      color: {
        type: String,
        default: 'rgb(255,255,255)'
      },
      intensity: {
        type: Number,
        default: 1.0
      },
      position: {
        default: () => {
          return new THREE.Vector3();
        },
      },
      update: Boolean
    },
    data() {
      return {
        scene: this.$store.state.scene,
        light: {}
      }
    },
    created() {
      switch (this.type) {
        case 'Ambient':
          this.light = new THREE.AmbientLight(this.color, this.intensity);
          break;
        case 'Directional':
          this.light = new THREE.DirectionalLight(this.color, this.intensity);
      }
      this.scene.add(this.light);
      this.SetPosition();
      if (this.update) {
        this.$store.commit('UpdateSceneDelegation', this.Update);
      }
    },
    beforeDestroy() {
      this.$store.commit('UpdateSceneDelegationRemove', this.Update);
    },
    methods: {
      SetPosition() {
        if (typeof this.position === 'string') {
          if (this.position === 'camera') {
            this.light.position.copy(this.$store.state.camera.position);
          }
        } else if (typeof this.position === 'object') {
          this.light.position.x = this.position.x || 0;
          this.light.position.y = this.position.y || 0;
          this.light.position.z = this.position.z || 0;
        }
      },
      Update() {
        this.SetPosition();
      }
    }
  }
</script>
<style scoped>

</style>
