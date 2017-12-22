<template>
  <div id="Panorama">

    <v-panorama-scene :width="width" :height="height" :panorama-img="imgs">
      <w-orbit-controls></w-orbit-controls>
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      <x-camera :width="width" :height="height" :far="2000">
        <x-light :type="'Directional'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      </x-camera>
      <x-box-geometry :material="material">
        <x-obj-loader :path="obj" :material="material"></x-obj-loader>
      </x-box-geometry>
    </v-panorama-scene>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'panorama',

    data() {
      return {
        imgs: ["../../../static/images/px.jpg", "../../../static/images/nx.jpg",
          "../../../static/images/py.jpg", "../../../static/images/ny.jpg",
          "../../../static/images/pz.jpg", "../../../static/images/nz.jpg"],
        material: this.$vue3d.Materials.ceramic(),
        obj: './static/demo/female02.obj',
      }
    },
    mounted() {
      setTimeout(() => {
        this.imgs = "../../../static/images/skyBox.jpg"
      }, 5000)
    },
    computed: {
      ...mapState(['width', 'height']),
    },
    methods: {}
  }
</script>

<style scoped>

</style>
