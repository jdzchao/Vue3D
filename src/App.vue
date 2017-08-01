<template>
  <div id="app">
    <three></three>
    <router-view></router-view>
  </div>
</template>

<script>
  import Three from './components/Three.vue'

  export default {
    name: 'app',
    components: {Three}
  }
</script>

<style>
  html body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
