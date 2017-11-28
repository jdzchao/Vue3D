<template>
  <div id="Index">
    <template id="scene">
      <m-renderer ref="renderer" :width="width" :height="height" @ready="Ready"></m-renderer>
      <m-camera ref="camera" :width="width" :height="height" @update="updateCamera"></m-camera>
      <m-controls ref="controls"></m-controls>
    </template>
    <template id="components" v-if="ready">
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(200,200,200)'"></x-light>
      <x-light :type="'Directional'" :intensity="0.8" :color="'rgb(200,200,200)'" :pos="camPos"></x-light>
      <!--<x-box-geometry></x-box-geometry>-->
      <x-obj-loader :path="'./static/demo/cup.obj'" :material="material"></x-obj-loader>
      <x-phong-material :cMap="'./static/demo/map.jpg'" @loaded="MtlSuccess"></x-phong-material>
    </template>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {
    MRenderer,
    MCamera,
    MControls,
    XBoxGeometry,
    XLight,
    XObjLoader,
    XPhongMaterial
  } from '../../Vue3D'

  export default {
    name: 'Index',
    components: {
      MRenderer,
      MCamera,
      MControls,
      XLight,
      XBoxGeometry,
      XObjLoader,
      XPhongMaterial,
    },
    data () {
      return {
        ready: false,
        material: null,
        camPos: null
      }
    },
    computed: {
      ...mapState(['width', 'height']),
    },
    methods: {
      Ready (bool) {
        this.ready = bool;
      },
      updateCamera (camera) {
        this.camPos = camera.position;
      },
      LoadError (err) {
      },
      LoadSuccess () {
      },
      LoadProcess (xhr) {
      },
      MtlSuccess (mtl) {
        this.material = mtl;
      }
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
