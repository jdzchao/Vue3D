<template>
  <div id="MScene">
    <x-scene :width="width" :height="height" ref="scene"></x-scene>
    <x-nav></x-nav>
    <x-light></x-light>
    <x-loader></x-loader>
  </div>
</template>
<script>
  import XScene from "./scene/XScene.vue"
  import XNav from "./scene/XNav.vue"
  import XLight from "./scene/XLight.vue"
  import XLoader from "./scene/XLoader.vue";

  export default {
    components: {
      XLoader, XLight, XScene, XNav
    },
    name: 'MScene',
    data() {
      return {
        height: this.$store.state.height - this.$store.state.rem,
        width: this.$store.state.width
      }
    },
    mounted() {

    },
  }
</script>
<style>
  #MScene {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000000;
  }
</style>
