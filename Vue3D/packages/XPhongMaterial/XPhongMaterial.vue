<template>
  <div id="XPhongMaterial"></div>
</template>
<script>
  import * as THREE from 'three'
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'XPhongMaterial',
    mixins: [Vue3D],
    props: {
      color: {type: String, default: 'rgb(255,255,255)'},
      cMap: {type: String}, // color map
      sMap: {type: String}, // specular map
      nMap: {type: String}, // normal map
      shininess: {type: Number, default: 30},
      flatShading: {type: Boolean, default: false}
    },
    data () {
      return {
        material: null,
        loader: new THREE.TextureLoader(),
      }
    },
    mounted () {
      this.Material();
    },
    watch: {
      cMap (val) {
        this.LoadColorMap(val);
      }
    },
    methods: {
      Material () {
        this.material = new THREE.MeshPhongMaterial({
          flatShading: this.flatShading,
          shininess: this.shininess,
          color: this.color,
        });
        if (this.cMap) {
          this.LoadColorMap(this.cMap);
        }
      },
      LoadColorMap (val) {
        this.loader.load(val, texture => {
            this.material.map = texture;
            this.material.map.needsUpdate = true;
            this.$emit('loaded', this.material);
          }, xhr => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          }, xhr => {
            console.log('An error happened');
          }
        )
      }
    }

  }
</script>
<style scoped>

</style>
