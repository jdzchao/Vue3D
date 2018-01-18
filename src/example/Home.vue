<template>
  <div id="Home">
    <v-scene :width="width" :height="height">
      <w-ray-cast @cast="raycast"></w-ray-cast>
      <w-orbit-controls></w-orbit-controls>
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      <x-camera :width="width" :height="height" :far="2000">
        <x-light :type="'Directional'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      </x-camera>
      <!--<x-box-geometry :material="material">-->
        <!--<x-obj-loader :path="obj" :material="material"></x-obj-loader>-->
      <!--</x-box-geometry>-->
      <w-grid-helper></w-grid-helper>
      <!--<x-obj-loader :path="obj" :material="material"></x-obj-loader>-->
      <!--<w-transform-controls :mesh="target"></w-transform-controls>-->
    </v-scene>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import WRayCast from "../../Vue3D/packages/WRayCast/WRayCast";
  import WSkyBox from "../../Vue3D/packages/WSkyBox/WSkyBox";
  import WGridHelper from "../../Vue3D/packages/WGridHelper/WGridHelper";
  import WTransformControls from "../../Vue3D/packages/WTransformControls/WTransformControls";

  export default {
    components: {
      WTransformControls,
      WGridHelper,
      WSkyBox,
      WRayCast
    },
    name: 'home',

    data() {
      return {
        ready: false,
        material: this.$vue3d.Materials.ceramic(),
        obj: './static/demo/female02.obj',
        target: null
      }
    },
    mounted() {
    },
    computed: {
      ...mapState(['width', 'height']),
    },
    methods: {
      raycast(objs) {
        if (objs.length > 0) {
          this.target = objs[0].object;
        } else {
          this.target = null;
        }
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
