<template>
  <div id="MScene">
    <div id="scene"></div>
    <div id="nav">
      <div id="canvas" @click="OpenCanvas">open</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MScene',
    data() {
      return {}
    },
    methods: {
      OpenCanvas() {
        this.$emit('HandleCanvasOpen', true)
      }
    }
  }
</script>
<style scoped>
  #scene {
    width: 100%;
    height: 94%;
  }

  #nav {
    width: 100%;
    height: 6%;
    background-color: #666666;
    position: relative;
  }

  #nav:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #979797;
    color: #979797;
    transform-origin: 0 0;
    transform: scaleY(.5)
  }
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
