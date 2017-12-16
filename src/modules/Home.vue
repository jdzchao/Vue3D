<template>
  <div id="Home">
    <v-scene :width="width" :height="height">
      <m-camera :width="width" :height="height" :far="2000">
        <x-light :type="'Directional'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      </m-camera>
      <w-orbit-controls></w-orbit-controls>
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      <x-box-geometry></x-box-geometry>
      <x-obj-loader :path="obj" :material="material"></x-obj-loader>
    </v-scene>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {
    VScene,
    MCamera,
    WOrbitControls,
    XBoxGeometry,
    XLight,
    XObjLoader,
    Materials
  } from '../../Vue3D'

  export default {
    name: 'home',
    components: {
      VScene,
      MCamera,
      WOrbitControls,
      XLight,
      XBoxGeometry,
      XObjLoader,
    },
    data() {
      return {
        ready: false,
        material: Materials.ceramic(),
        obj: './static/demo/female02.obj',
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
