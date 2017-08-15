<template>
  <div id="app">
    <m-scene></m-scene>
    <m-canvas></m-canvas>
    <m-panel></m-panel>
    <m-loading></m-loading>
  </div>
</template>

<script>
  import MScene from './components/MScene.vue'
  import MCanvas from './components/MCanvas.vue'
  import MPanel from './components/MPanel.vue'
  import MLoading from './components/MLoading.vue'

  export default {
    name: 'app',
    components: {MScene, MCanvas, MPanel, MLoading},
    data() {
      return {
        rem: document.body.clientHeight * 0.06
      }
    },
    created() {
      this.WindowResize();
      window.addEventListener("resize", this.WindowResize);
    },
    mounted() {
      this.$store.commit('LoadingNext');
    },
    methods: {
      WindowResize() {
        this.rem = document.body.clientHeight * 0.06;
        document.documentElement.style.fontSize = this.rem + "px";
        this.$store.state.width = document.body.clientWidth;
        this.$store.state.height = document.body.clientHeight;
        this.$store.state.rem = this.rem;
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
