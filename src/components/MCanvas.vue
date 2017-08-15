<template>
  <transition name="canvas" enterActiveClass="animated slideInUp" leaveActiveClass="animated slideOutDown">
    <div id="MCanvas" v-show="this.$store.state.isCanvasOpen">
      <x-tools></x-tools>
      <x-canvas></x-canvas>
      <x-nav></x-nav>
    </div>
  </transition>
</template>
<script>
  import XTools from './canvas/XTools.vue'
  import XCanvas from './canvas/XCanvas.vue'
  import XNav from './canvas/XNav.vue'

  export default {
    components: {XTools, XCanvas, XNav},
    name: 'MCanvas',
    data() {
      return {}
    },
    methods: {

    }
  }
</script>
<style>
  #MCanvas {
    width: 100%;
    position: absolute;
    z-index: 20;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
