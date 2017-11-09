<template>
  <div id="Index">
    <template id="scene">
      <m-renderer :width="width" :height="height" @ready="Ready"></m-renderer>
      <m-camera :width="width" :height="height"></m-camera>
      <m-controls></m-controls>
    </template>
    <template id="components" v-if="ready">
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(200,200,200)'"></x-light>
      <x-light :type="'Directional'" :intensity="0.8" :color="'rgb(200,200,200)'" :position="lPos"></x-light>
      <!--<x-box-geometry></x-box-geometry>-->
      <x-obj-loader :path="'./static/demo/cup.obj'" :material="material" @loaded="LoadSuccess" @process="LoadProcess" @error="LoadError"></x-obj-loader>
      <x-material :cMap="'./static/demo/map.jpg'" @loaded="MtlSuccess"></x-material>
    </template>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import MRenderer from '../components/Vue3D/MRenderer.vue'
  import MCamera from '../components/Vue3D/MCamera.vue'
  import MControls from '../components/Vue3D/MControls.vue'
  import XLight from '../components/Vue3D/XLight.vue'
  import XBoxGeometry from '../components/Vue3D/XBoxGeometry.vue'
  import XObjLoader from '../components/Vue3D/XObjLoader.vue'
  import XMaterial from "../components/Vue3D/XPhongMaterial.vue";

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
        material: null
      }
    },
    computed: {
      ...mapState(['width', 'height']),
      ...mapState({
        scene: state => state.vue3d.scene,
        camera: state => state.vue3d.camera,
        renderer: state => state.vue3d.renderer,
      })
    },
    watch: {
      camera: {
        deep: true,
        handler (val) {
          this.lPos = val.position
        }
      }
    },
    methods: {
      Ready (bool) {
        this.ready = bool;
      },
      LoadError (err) {
        console.log(err);
      },
      LoadSuccess () {
      },
      LoadProcess (xhr) {
        console.log(xhr);
      },
      MtlSuccess (mtl) {
        console.log(mtl);
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
