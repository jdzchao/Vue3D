<template>
  <div id="XLight"></div>
</template>
<script>
  // Ambient 环境光
  // Directional 平行光
  import * as THREE from 'three'
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'XLight',
    mixins: [Vue3D],
    props: {
      type: {type: String, default: 'Ambient'},
      color: {type: String, default: 'rgb(255,255,255)'},
      intensity: {type: Number, default: 1.0},
      pos: {
        default: () => {
          return new THREE.Vector3();
        },
      }
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
          this.setPosition(val);
        }
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
      this.$vue3d.scene.add(this.light);
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
    }
  }
</script>
<style scoped>

</style>
