<template>
  <div id="scene" class="viewport">
    <v-scene :width="vWidth" :height="vHeight" @ready="getReady">
      <w-orbit-controls></w-orbit-controls>
      <w-sky-box path="../../../static/images/"></w-sky-box>
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      <x-camera :width="vWidth" :height="vHeight" :far="2000">
        <x-light ref="light" :type="'Directional'" :intensity="1" :color="'rgb(255,0,255)'"></x-light>
      </x-camera>
      <x-obj-loader path="./static/demo/cup/inner.obj"></x-obj-loader>
    </v-scene>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import VScene from "../../../Vue3D/packages/VScene/VScene"
  import WOrbitControls from '../../../Vue3D/packages/WOrbitControls/WOrbitControls'
  import WSkyBox from "../../../Vue3D/packages/WSkyBox/WSkyBox";
  import XLight from "../../../Vue3D/packages/XLight/XLight"
  import XCamera from "../../../Vue3D/packages/XCamera/XCamera"
  import XObjLoader from '../../../Vue3D/packages/XObjLoader'

  export default {
    name: "Scene",
    components: {
      VScene,
      WOrbitControls,
      WSkyBox,
      XLight,
      XCamera,
      XObjLoader
    },
    data() {
      return {}
    },
    methods: {
      getReady(scene) {
        console.log(scene);
      }
    },
    computed: {
      ...mapState(['vWidth', 'vHeight'])
    }
  }
</script>

<style scoped>
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
