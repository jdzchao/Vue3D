<template>
  <div>
    <v-scene :width="width" :height="height">
      <m-camera :width="width" :height="height" :far="2000"></m-camera>
      <x-ground></x-ground>
      <x-ground></x-ground>
    </v-scene>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import VScene from "../../Vue3D/packages/VScene/VScene";
  import XGround from "../../Vue3D/packages/XGround/XGround";
  import MCamera from "../../Vue3D/packages/MCamera/MCamera";

  export default {
    name: "multi-scene",
    components: {
      MCamera,
      XGround,
      VScene
    },
    computed: {
      ...mapState(['width', 'height']),
    },

  }
</script>
