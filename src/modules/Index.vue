<template>
  <div id="Index">
    <m-scene v-model="scene">

      <template id="scene">
        <m-renderer ref="renderer" :width="width" :height="height" @ready="Ready"></m-renderer>
        <m-camera ref="camera" :width="width" :height="height" :far="2000" @update="updateCamera"></m-camera>
        <m-orbit-controls :min="10" :max="999"></m-orbit-controls>
      </template>

      <template id="components" v-if="ready">
        <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(200,200,200)'"></x-light>
        <x-light :type="'Directional'" :intensity="0.8" :color="'rgb(200,200,200)'" :pos="camPos"></x-light>
        <!--<x-obj-loader :path="obj" :material="material" @loaded="LoadSuccess"></x-obj-loader>-->
        <x-box-geometry :material="material"></x-box-geometry>
      </template>

    </m-scene>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {
    MRenderer,
    MCamera,
    MOrbitControls,
    XBoxGeometry,
    XLight,
    XObjLoader,
    Materials,
    MScene
  } from '../../Vue3D'

  export default {
    name: 'Index',
    components: {
      MRenderer,
      MCamera,
      MOrbitControls,
      XLight,
      XBoxGeometry,
      XObjLoader,
      MScene
    },
    data() {
      return {
        ready: false,
        material: Materials.ceramic(),
        camPos: null,
        obj: './static/demo/cup.obj',
        object: null,
        scene: null
      }
    },
    mounted() {
      let vm = this;
    },
    computed: {
      ...mapState(['width', 'height']),
    },
    methods: {
      Ready(bool) {
        this.ready = bool;
      },
      updateCamera(camera) {
        this.camPos = camera.position;
      },
      LoadError(err) {
      },
      LoadSuccess(object) {
        this.$vue3d.placeZeroPoint(object);
        this.$vue3d.adaptScale(object);
        this.object = object;
      },
      LoadProcess(xhr) {
      },
    }
  }
</script>
<style>
  #Index {
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
