<template>
  <div id="header">
    <div class="logo">Vue3D</div>
    <div class="collapse">
      <el-radio-group v-model="isCollapse" size="mini">
        <el-radio-button :label="false"><i class="el-icon-menu"></i></el-radio-button>
        <el-radio-button :label="true"><i class="el-icon-more"></i></el-radio-button>
      </el-radio-group>
    </div>
    <div class="link">
      <el-tabs v-model="activeTab" @tab-click="changeTab">
        <el-tab-pane label="首页" name="index"></el-tab-pane>
        <el-tab-pane label="示例" name="example"></el-tab-pane>
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
        isCollapse: false,
        activeTab: ''
      }
    },
    watch: {
      $route(val) {
        this.activeTab = this.$route.meta.activeTab;
      },
      isCollapse(val) {
        this.$store.state.isCollapse = val;
      }
    },
    methods: {
      changeTab() {
        this.$router.push('/' + this.activeTab);
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
