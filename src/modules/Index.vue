<template>
  <div id="Index">
    <x-scene ref="scene"></x-scene>
    <template id="components"></template>
  </div>
</template>
<script>
  import XScene from '../components/XScene.vue'

  export default {
    name: 'Index',
    components: {
      XScene
    },
    data() {
      return {}
    },
    computed: {},
    created() {

    },
    mounted() {
      console.log(this.$refs.scene);
    },
  }
</script>
<style>
  #Index {
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
