<template>
  <div id="Index">
    <template id="scene">
      <m-renderer :width="width" :height="height" @ready="Ready"></m-renderer>
      <m-camera :width="width" :height="height"></m-camera>
      <m-controls></m-controls>
    </template>
    <template id="components" v-if="ready">
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(200,200,200)'"></x-light>
      <x-light :type="'Directional'" :intensity="0.8" :color="'rgb(200,200,200)'" :position="$vue3d.camera.position"></x-light>
      <!--<x-box-geometry></x-box-geometry>-->
      <x-obj-loader :path="'./static/demo/cup.obj'" :material="material" @loaded="LoadSuccess" @process="LoadProcess" @error="LoadError"></x-obj-loader>
      <x-material :cMap="'./static/demo/map.jpg'" @loaded="MtlSuccess"></x-material>
    </template>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import MRenderer from '../../Vue3D/packages/MRenderer'
  import MCamera from '../../Vue3D/packages/MCamera'
  import MControls from '../../Vue3D/packages/MControls'
  import XLight from '../../Vue3D/packages/XLight'
  import XBoxGeometry from '../../Vue3D/packages/XBoxGeometry'
  import XObjLoader from '../../Vue3D/packages/XObjLoader'
  import XMaterial from "../../Vue3D/packages/XPhongMaterial";

  export default {
    name: 'Index',
    components: {
      MRenderer,
      MCamera,
      MControls,
      XLight,
      XBoxGeometry,
      XObjLoader,
      XMaterial,
    },
    data () {
      return {
        ready: false,
        lPos: null,
        material: null,
      }
    },
    computed: {
      ...mapState(['width', 'height']),
    },
    watch: {
      camera: {
        deep: true,
        handler (val) {
          console.log(camera);
        }
      }
    },
    methods: {
      Ready (bool) {
        this.ready = bool;
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
