<template>
  <div id="Home">
    <v-scene :width="width" :height="height">
      <w-raycast></w-raycast>
      <w-orbit-controls></w-orbit-controls>
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      <x-camera :width="width" :height="height" :far="2000">
        <x-light :type="'Directional'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      </x-camera>
      <x-box-geometry :material="material">
      </x-box-geometry>
      <x-obj-loader :path="obj" :material="material"></x-obj-loader>
      <!--<x-obj-loader :path="obj" :material="material"></x-obj-loader>-->
    </v-scene>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import WRaycast from "../../Vue3D/packages/WRaycast/WRaycast";


  export default {
    components: {WRaycast},
    name: 'home',

    data() {
      return {
        ready: false,
        material: this.$vue3d.Materials.ceramic(),
        obj: './static/demo/female02.obj',
      }
    },
    mounted() {
    },
    computed: {
      ...mapState(['width', 'height']),
    },
    methods: {
      changeM() {
        this.mtls = Materials.ceramic();
      },
      Ready(bool) {
        this.ready = bool;
      },
      updateCamera(camera) {
        this.camPos = camera.position;
      },
      LoadError(err) {
      },
      LoadSuccess(object) {
        console.log(object);
        this.$vue3d.placeZeroPoint(object);
        this.$vue3d.adaptScale(object);
        this.object = object;
      },
      loads(object) {
        this.objs = object;
        this.objs.position.x -= 50;
      },
      LoadProcess(xhr) {
      },
    }
  }
</script>
<style>
  #Home {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000000;
  }
</style>
