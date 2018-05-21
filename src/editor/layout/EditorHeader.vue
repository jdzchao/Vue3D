<template>
  <div id="editor-header">
    <editor-menu></editor-menu>
  </div>
</template>

<script>

  import EditorMenu from "../panel/EditorMenu";

  export default {
    name: "EditorHeader",
    components: {EditorMenu}
  }
</script>

<style scoped>
  #editor-header {
    position: relative;
    width: 100%;
    height: 61px;
    overflow: hidden;
  }
</style>
