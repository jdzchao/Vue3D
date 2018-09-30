<template>
  <div id="Example">
    <p-menu :menus="menus"></p-menu>
    <p-view></p-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import PMenu from "../components/page/PMenu";
  import PView from "../components/page/PView";
  import MenuData from "./example/config"

  export default {
    name: "Example",
    components: {PView, PMenu},
    data() {
      return {
        menus: MenuData,
      }
    },
    computed: {
      ...mapState(['isCollapse'])
    }
  }
</script>

<style scoped>
  #Example {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
