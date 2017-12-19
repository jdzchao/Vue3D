<template>
  <div id="MultiShow">
    <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
    <x-light :type="'Directional'" :intensity="0.5" :color="'rgb(255,255,255)'" :pos="cameraPosition"></x-light>
    <!--<x-box-geometry :material="material"></x-box-geometry>-->
    <x-obj-loader :path="obj" :material="material" @loaded="LoadSuccess"></x-obj-loader>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import XBoxGeometry from "../../Vue3D/packages/XBoxGeometry/XBoxGeometry";
  import XLight from '../../Vue3D/packages/XLight'
  import XObjLoader from '../../Vue3D/packages/XObjLoader'
  import Materials from '../../Vue3D/packages/Materials'
  import Vue3d from '../../Vue3D/packages/Utils'

  export default {
    name: "multi-show",
    components: {
      XBoxGeometry,
      XObjLoader,
      XLight,
    },
    data() {
      return {
        obj: './static/demo/female02.obj',
        material: Materials.metal()
      }
    },
    created() {
    },
    mounted() {

    },
    computed: {
      ...mapState({
        cameraPosition: state => state.cameraPosition
      }),
    },
    methods: {
      LoadSuccess(object) {
        Vue3d.adaptScale(object, document.body.clientWidth / document.body.clientHeight);
        Vue3d.placeZeroPoint(object);
      }
    }
  }
</script>

