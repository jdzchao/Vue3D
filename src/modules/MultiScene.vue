<template>
  <div>
    <v-scene :width="width" :height="height">
      <m-camera :width="width" :height="height" :far="2000"></m-camera>
      <m-controls></m-controls>
      <multi-show></multi-show>
      <x-box-geometry :material="mtl"></x-box-geometry>
    </v-scene>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import VScene from "../../Vue3D/packages/VScene/VScene";
  import XGround from "../../Vue3D/packages/XGround/XGround";
  import MCamera from "../../Vue3D/packages/MCamera/MCamera";
  import XBoxGeometry from "../../Vue3D/packages/XBoxGeometry/XBoxGeometry";
  import MControls from "../../Vue3D/packages/MOrbitControls";
  import XObjLoader from '../../Vue3D/packages/XObjLoader'
  import Materials from '../../Vue3D/packages/Materials'
  import XLight from '../../Vue3D/packages/XLight'
  import MultiShow from './MultiShow'

  export default {
    name: "multi-scene",
    components: {
      MultiShow,
      MControls,
      XBoxGeometry,
      MCamera,
      XGround,
      VScene,
      XObjLoader,
      XLight
    },
    computed: {
      ...mapState(['width', 'height']),
    },
    data() {
      return {
        ready: false,
        material: Materials.metal(),
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
        this.object = object;
        this.$refs.s1.adaptScale(object, this.width / this.height);
        this.$refs.s1.placeZeroPoint(object);
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
