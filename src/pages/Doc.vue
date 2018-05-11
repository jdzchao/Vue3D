<template>
  <div id="doc">
    <div class="left">asd</div>
    <div class="right">ddd</div>
    <div class="hack">ddd</div>
  </div>
</template>

<script>
  export default {
    name: "Doc"
  }
</script>

<style scoped>
  #doc {
    width: 100%;
    height: 100%;
  }

  .left {
    float: left;
    width: 200px;
    height: 100%;
    background-color: #979797;
  }

  .right {
    float: left;
    width: calc(100% - 450px);
    height: 100%;
    background-color: #ce3c39;
  }

  .hack {
    float: left;
    width: 250px;
    height: 100%;
    background-color: green;
  }
</style>
