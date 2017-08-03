<template>
  <div id="app">
    <m-scene @HandleCanvasOpen="HandleCanvasOpen"></m-scene>
    <!--二维画布-->
    <transition name="canvas" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <m-canvas v-show="isCanvasOpen"></m-canvas>
    </transition>
    <transition name="panel" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <router-view v-show="isPanelOpen"></router-view>
    </transition>
  </div>
</template>

<script>
  import MScene from './components/MScene.vue'
  import MCanvas from './components/MCanvas.vue'

  export default {
    name: 'app',
    components: {MScene, MCanvas},
    data() {
      return {
        isPanelOpen: false,
        isCanvasOpen: false
      }
    },
    computed: {
      width: function () {
        return document.body.clientWidth;
      }
    },
    mounted() {
      console.log(document.body.clientWidth);
    },
    methods: {
      HandleCanvasOpen(val) {
        this.isCanvasOpen = val;
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
</style>
