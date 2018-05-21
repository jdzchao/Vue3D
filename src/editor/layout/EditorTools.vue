<template>
  <div id="editor-tools">
    <el-tabs type="border-card" class="tools">
      <el-tab-pane label="Inspector">
      </el-tab-pane>
      <el-tab-pane label="Hierarchy">
      </el-tab-pane>
      <el-tab-pane label="Design">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  export default {
    name: "EditorTools",
  }
</script>

<style scoped>
  #editor-tools {
    float: left;
    width: 350px;
    height: calc(100% - 100px);
    overflow: hidden;
  }

  .tools {
    height: 100%;
  }
</style>
<style>
  .tools .el-tabs__content {
    overflow-y: scroll;
    height: calc(100% - 60px);
  }

  .tools .el-tabs__content::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
  }

  .tools .el-tabs__content::-webkit-scrollbar {
    width: 3px;
    background-color: #F5F5F5;
  }

  .tools .el-tabs__content::-webkit-scrollbar-thumb {
    background-color: #545c64;
  }
</style>
