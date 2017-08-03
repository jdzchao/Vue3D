<template>
  <div id="MCanvas"></div>
</template>
<script>
  export default {
    name: 'MCanvas',
    data() {
      return {}
    }
  }
</script>
<style>
  #MCanvas {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("../../static/images/bg_canvas.jpg");
  }
</style>
