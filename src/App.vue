<template>
  <div id="app">
    <index ref="scene"></index>
  </div>
</template>

<script>
  import Index from './modules/Index.vue'

  export default {
    name: 'app',
    components: {
      Index
    },
    data() {
      return {}
    },
    created() {
      this.$store.commit('mobileResize');
      window.addEventListener("resize", () => {
        this.$store.commit('mobileResize')
      });
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
    overflow: hidden;
  }

  .animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
</style>
