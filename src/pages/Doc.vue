<template>
  <div id="doc">
    <p-menu :obj="menu" :default="active"></p-menu>
    <p-view></p-view>
  </div>
</template>

<script>
  import PView from "../components/page/PView";
  import PMenu from "../components/page/PMenu";
  import MenuData from './Doc/menu'

  export default {
    name: "Doc",
    data() {
      return {
        menu: MenuData,
        active: '1'
      }
    },
    components: {PMenu, PView}
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
