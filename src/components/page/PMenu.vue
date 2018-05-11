<template>
  <div id="menu">
    <el-menu :default-active="activeMenu" class="el-menu-vertical">
      <el-menu-item index="2" to="/example/dev">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>

      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "PMenu",
    data() {
      return {
        activeMenu: '4'
      }
    },
    watch: {
      activeMenu(val) {
        this.$store.state.activeMenu = val;
      }
    }
  }
</script>

<style scoped>
  #menu {
    float: left;
    width: 200px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #menu::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
  }

  #menu::-webkit-scrollbar {
    width: 3px;
    background-color: #F5F5F5;
  }

  #menu::-webkit-scrollbar-thumb {
    background-color: #545c64;
  }
</style>
