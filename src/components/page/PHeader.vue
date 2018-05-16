<template>
  <div id="header">
    <div class="logo"><span style="color:#41B883;">Vue</span>3D<span style="color:#41B883;"></span></div>
    <div class="link">
      <el-tabs v-model="activeNav" @tab-click="changeTab">
        <el-tab-pane label="首页" name="index"></el-tab-pane>
        <el-tab-pane label="示例" name="example"></el-tab-pane>
        <el-tab-pane label="文档" name="doc"></el-tab-pane>
        <el-tab-pane label="编辑器" name="editor"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PHeader",
    data() {
      return {
        activeNav: ''
      }
    },
    watch: {
      $route(val) {
        this.activeNav = this.$route.meta.activeNav;
        this.$store.state.activeNav = this.activeNav;
      },
    },
    methods: {
      changeTab() {
        this.$router.push('/' + this.activeNav);
      }
    }
  }
</script>

<style scoped>
  #header {
    position: relative;
    height: 60px;
    background-color: #545c64;
    color: #ffffff;
    line-height: 60px;
    padding: 0 20px;
    overflow: hidden;
  }

  .logo {
    width: 150px;
    float: left;
    font-size: 30px;
    text-align: center;
  }

  .collapse {
    float: left;
  }

  .link {
    float: right;
    color: #ffffff;
  }

</style>
<style>
  .el-tabs__nav-wrap::after {
    background-color: #545c64;
  }

  .el-tabs__item {
    color: #ffffff;
  }

  .el-tabs__item.is-active {
    color: #ffd04b;
  }

  .el-tabs__item:hover {
    color: #ffd04b;
  }

  .el-tabs__active-bar {
    background-color: #ffd04b;
  }

  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #ffd04b;
    border-color: #ffd04b;
    box-shadow: -1px 0 0 0 #ffd04b;
  }
</style>
