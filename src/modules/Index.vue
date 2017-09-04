<template>
  <div id="Index">
    <m-scene :width="width" :height="height" ref="handle" @onReady="onReady"></m-scene>
    <template id="components" v-if="ready">
      <x-light :type="'Ambient'" :position="{x:0,y:0,z:0}"></x-light>
      <x-light :type="'Directional'" :position="{x:0,y:0,z:0}"></x-light>
      <x-box-geometry></x-box-geometry>
    </template>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import MScene from '../components/MScene.vue'
  import XLight from '../components/Vue3D/XLight.vue'
  import XBoxGeometry from '../components/Vue3D/XBoxGeometry.vue'

  export default {
    name: 'Index',
    components: {
      MScene,
      XLight,
      XBoxGeometry
    },
    data() {
      return {
        ready: false
      }
    },
    mounted() {
      this.$store.state.three.handle = this.$refs.handle;
    },
    computed: {
      ...mapState(['width', 'height'])
    },
    methods: {
      onReady(bool) {
        this.ready = bool;
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
