<template>
  <div id="Index">
    <template id="scene">
      <m-renderer ref="renderer" :width="width" :height="height" @ready="Ready"></m-renderer>
      <m-camera ref="camera" :width="width" :height="height" :far="2000" @update="updateCamera"></m-camera>
      <m-orbit-controls :min="10" :max="999"></m-orbit-controls>
    </template>
    <template id="components" v-if="ready">
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(200,200,200)'"></x-light>
      <x-light :type="'Directional'" :intensity="0.8" :color="'rgb(200,200,200)'" :pos="camPos"></x-light>
      <x-obj-loader :path="obj" :material="material" @loaded="LoadSuccess"></x-obj-loader>
      <x-obj-loader :path="sobj" :material="mtl" v-if="Object" :group="object" @loaded="loads"></x-obj-loader>
      <x-obj-loader :path="obj" :material="mtls" v-if="objs" :group="objs"></x-obj-loader>
      <x-box-geometry :material="mtl" :group="object"></x-box-geometry>
    </template>
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
    Materials
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
    },
    data() {
      return {
        ready: false,
        material: Materials.sapphire(),
        mtl: Materials.glass(),
        mtls: Materials.metal(),
        camPos: null,
        obj: './static/demo/female02.obj',
        sobj: './static/demo/cup.obj',
        object: null,
        objs: null
      }
    },
    mounted() {
      let vm = this;
      setTimeout(this.changeM, 2000)
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
