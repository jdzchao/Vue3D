<template>
  <div id="Index">
    <template id="scene">
      <m-renderer :width="width" :height="height" @onReady="onReady"></m-renderer>
      <m-camera :width="width" :height="height"></m-camera>
      <m-controls></m-controls>
    </template>
    <template id="components" v-if="ready">
      <x-light :type="'Ambient'" :position="{x:0,y:0,z:0}" :intensity="0.6"></x-light>
      <x-light :type="'Directional'" :position="{x:20,y:15,z:50}" :intensity="0.4" follow></x-light>
      <!--<x-box-geometry></x-box-geometry>-->
      <x-obj-loader path="http://39.108.53.123/obj/cup1/body.obj" :material="testMaterial" :map="testMap"></x-obj-loader>
    </template>
    <button style="position: fixed;top: 0" @click="luckyTest">test</button>
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

  export default {
    name: 'Index',
    components: {
      MRenderer,
      MCamera,
      MControls,
      XLight,
      XBoxGeometry,
      XObjLoader
    },
    data() {
      return {
        ready: false,
        testMap: 'http://39.108.53.123/obj/cup1/bodytexture.jpg',
        testMaterial: 'MeshPhong'
      }
    },
    created(){

    },
    computed: {
      ...mapState(['width', 'height'])
    },
    methods: {
      onReady(bool) {
        this.ready = bool;
      },
      luckyTest(){
        this.testMaterial = 'meshbasic';
        //this.testMap = 'http://39.108.53.123/obj/cup1/bodyzhankai.jpg';
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
