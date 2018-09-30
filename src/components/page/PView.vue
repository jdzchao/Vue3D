<template>
  <div id="view">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "PView"
  }
</script>

<style scoped>
  #view {
    float: left;
    width: calc(100% - 220px);
    height: calc(100% - 20px);
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #f5f5f5;
    padding: 10px;
  }

  #view::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
  }

  #view::-webkit-scrollbar {
    width: 3px;
    background-color: #F5F5F5;
  }

  #view::-webkit-scrollbar-thumb {
    background-color: #545c64;
  }
</style>
