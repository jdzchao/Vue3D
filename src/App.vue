<template>
  <div id="app">
    <p-header></p-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import PHeader from "./components/page/PHeader";

  export default {
    name: 'app',
    components: {PHeader},
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
