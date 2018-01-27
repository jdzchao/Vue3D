<template>
  <div id="Home">
    <v-scene :width="width" :height="height">
      <w-ray-cast @cast="raycast"></w-ray-cast>
      <w-orbit-controls></w-orbit-controls>
      <w-sky-box path="../../../static/images/"></w-sky-box>
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      <x-camera :width="width" :height="height" :far="2000">
        <x-light :type="'Directional'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      </x-camera>
      <w-grid-helper></w-grid-helper>
      <x-box-geometry :material="material">
        <y-phong-material></y-phong-material>
      </x-box-geometry>
      <!--<x-obj-loader :path="obj" :material="material"></x-obj-loader>-->
      <w-transform-controls :target="target"></w-transform-controls>
      <w-box-helper color="rgb(255,0,0)" :target="target"></w-box-helper>
    </v-scene>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import VScene from "../../Vue3D/packages/VScene/VScene"
  import WOrbitControls from '../../Vue3D/packages/WOrbitControls/WOrbitControls'
  import WRayCast from "../../Vue3D/packages/WRayCast/WRayCast";
  import WSkyBox from "../../Vue3D/packages/WSkyBox/WSkyBox";
  import WGridHelper from "../../Vue3D/packages/WGridHelper/WGridHelper";
  import WTransformControls from "../../Vue3D/packages/WTransformControls/WTransformControls";
  import XLight from "../../Vue3D/packages/XLight/XLight"
  import XBoxGeometry from "../../Vue3D/packages/XBoxGeometry/index"
  import XCamera from "../../Vue3D/packages/XCamera/XCamera"
  import Materials from "../../Vue3D/packages/Materials"
  import WBoxHelper from "../../Vue3D/packages/WBoxHelper/WBoxHelper";
  import YPhongMaterial from "../../Vue3D/packages/YPhongMaterial/YPhongMaterial";

  export default {
    components: {
      YPhongMaterial,
      WBoxHelper,
      VScene,
      WOrbitControls,
      WTransformControls,
      WGridHelper,
      WSkyBox,
      WRayCast,
      XCamera,
      XLight,
      XBoxGeometry
    },
    name: 'home',
    data() {
      return {
        ready: false,
        material: Materials.ceramic(),
        obj: './static/demo/female02.obj',
        target: null,
        object: null,
        toPosition: [0, -80, 0],
        toScale: [1.5, 1.5, 1.5]
      }
    },
    mounted() {

    },
    computed: {
      ...mapState(['width', 'height']),
    },
    methods: {
      raycast(objs) {
        if (objs && objs.length > 0) {
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
