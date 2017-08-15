<template>
  <div id="MScene">
    <x-scene ref="scene"></x-scene>
    <x-nav></x-nav>
  </div>
</template>
<script>
  import XScene from "./scene/XScene.vue"
  import XNav from "./scene/XNav.vue"

  export default {
    components: {XScene, XNav},
    name: 'MScene',
    data() {
      return {}
    },
    mounted() {
      console.log(this.$refs.scene.scene);
    },
    computed: {},
    methods: {}
  }
</script>
<style scoped>

</style>
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
