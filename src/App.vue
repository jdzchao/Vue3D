<template>
  <div id="app">
    <p-header></p-header>
    <p-content></p-content>
  </div>
</template>

<script>
  import PHeader from "./components/page/PHeader";
  import PContent from "./components/page/PContent";

  export default {
    name: 'app',
    components: {PContent, PHeader},
    created() {
      this.$store.dispatch('windowResize');
      window.addEventListener("resize", () => {
        this.$store.dispatch('windowResize');
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
</style>
