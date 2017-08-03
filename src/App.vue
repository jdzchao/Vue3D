<template>
  <div id="app">
    <m-scene></m-scene>
    <!--二维画布-->
    <transition name="canvas" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <m-canvas v-show="this.$store.state.isCanvasOpen"></m-canvas>
    </transition>
    <transition name="panel" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <m-panel v-show="this.$store.state.isPanelOpen"></m-panel>
    </transition>
  </div>
</template>

<script>
  import MScene from './components/MScene.vue'
  import MCanvas from './components/MCanvas.vue'
  import MPanel from './components/MPanel.vue'

  export default {
    name: 'app',
    components: {MScene, MCanvas, MPanel},
    data() {
      return {}
    },
    created() {
      this.WindowResize();
      window.addEventListener("resize", this.WindowResize);
    },
    methods: {
      WindowResize() {
        this.$store.state.width = document.body.clientWidth;
        this.$store.state.height = document.body.clientHeight;
        document.documentElement.style.fontSize = document.body.clientHeight * 0.06 + "px";
      }
    }
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
</style>
