<template>
  <div id="content">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "PContent"
  }
</script>

<style scoped>
  #content {
    position: relative;
    width: 100%;
    height: calc(100% - 90px);
  }
</style>
