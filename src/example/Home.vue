<template>
  <div id="Home">
    <v-scene :width="width" :height="height" :auto="true">
      <w-ray-cast @cast="raycast"></w-ray-cast>
      <w-orbit-controls></w-orbit-controls>
      <w-animation :object="object" :to-position="toPosition" :to-scale="toScale" :repeat="-1"></w-animation>
      <w-sky-box path="../../../static/images/"></w-sky-box>
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      <x-camera :width="width" :height="height" :far="2000">
        <x-light :type="'Directional'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      </x-camera>
      <x-box-geometry :material="material" ref="box"></x-box-geometry>
      <x-obj-loader :path="obj" :material="material" @loaded="LoadSuccess"></x-obj-loader>
      <!--<x-obj-loader :path="obj" :material="material"></x-obj-loader>-->
    </v-scene>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import WRayCast from "../../Vue3D/packages/WRayCast/WRayCast";
  import WSkyBox from "../../Vue3D/packages/WSkyBox/WSkyBox";


  export default {
    components: {
      WSkyBox,
      WRayCast
    },
    name: 'home',

    data() {
      return {
        ready: false,
        material: this.$vue3d.Materials.ceramic(),
        obj: './static/demo/female02.obj',
        object: null,
        toPosition: [0, -80, 0],
        toScale: [1.5, 1.5, 1.5]
      }
    },
    mounted() {
      setTimeout(() => {
        this.toPosition = [0, 50, 0];           //参数调整必须在对象update之前
        this.toScale = null;
        this.object = this.$refs.box.object3d;
      }, 3000)
    },
    computed: {
      ...mapState(['width', 'height']),
    },
    methods: {
      raycast(objs) {
        console.log(objs);
      },
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
        // console.log(object);
        // this.$vue3d.placeZeroPoint(object);
        // this.$vue3d.adaptScale(object);
        this.object = object;
        this.object.position.y -= 150;
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
