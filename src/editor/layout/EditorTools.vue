<template>
  <div id="editor-tools">
    <el-tabs type="border-card" class="tools">
      <el-tab-pane label="Inspector">
        <tools-inspector></tools-inspector>
      </el-tab-pane>
      <el-tab-pane label="Hierarchy">
        <tools-hierarchy></tools-hierarchy>
      </el-tab-pane>
      <el-tab-pane label="UV">
        <tools-u-v></tools-u-v>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ToolsHierarchy from "../panel/ToolsHierarchy";
  import ToolsInspector from "./ToolsInspector";
  import ToolsUV from "../panel/ToolsUV";

  export default {
    name: "EditorTools",
    components: {ToolsUV, ToolsInspector, ToolsHierarchy},
  }
</script>

<style scoped>
  #editor-tools {
    float: left;
    width: 350px;
    height: calc(100% - 61px);
    overflow: hidden;
  }

  .tools {
    height: 100%;
  }
</style>
<style>
  .tools .el-tabs__content {
    overflow-y: scroll;
    height: calc(100% - 39px - 30px);
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
