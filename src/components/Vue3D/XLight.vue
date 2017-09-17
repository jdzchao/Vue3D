<template>
  <div id="XLight">
  </div>
</template>
<script>
  // Ambient 环境光
  // Directional 平行光
  const THREE = require('three');
  import _XCom from './_XCom.vue'

  export default {
    name: 'XLight',
    mixins: [_XCom],
    props: {
      type: {type: String, default: 'Ambient'},
      color: {type: String, default: 'rgb(255,255,255)'},
      intensity: {type: Number, default: 1.0},
      position: {
        default: () => {
          return new THREE.Vector3();
        },
      },
      follow: Boolean,
    },
    data() {
      return {
        light: {},
      }
    },
    watch: {
      position: {
        deep: true,
        handler(val) {
          this.setPosition();
        }
      },
      follow(val){

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
      this.cameraFollow();
      this.render();
    },
    methods: {
      setPosition() {
        if (this.position.hasOwnProperty('x')) {
          this.light.position.x = this.position.x || 0;
        }
        if (this.position.hasOwnProperty('y')) {
          this.light.position.y = this.position.y || 0;
        }
        if (this.position.hasOwnProperty('z')) {
          this.light.position.z = this.position.z || 0;
        }
      },
      cameraFollow(){
          if(this.follow){
              this.$store.state.vue3d.rendererDelegation.push(
                () => {this.light.position.copy(this.camera.position)}
              )
          }
      }
    }
  }
</script>
<style scoped>

</style>
