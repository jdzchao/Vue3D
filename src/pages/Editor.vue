<template>
  <div id="editor">
    <editor-menu></editor-menu>
    <editor-viewport></editor-viewport>
    <editor-tools></editor-tools>
  </div>
</template>

<script>
  import EditorMenu from "../editor/layout/EditorMenu";
  import EditorViewport from "../editor/layout/EditorViewport";
  import EditorTools from "../editor/layout/EditorTools";

  export default {
    components: {
      EditorTools,
      EditorMenu,
      EditorViewport,
    },
    name: "editor",
    data() {
      return {
        width: 500,
        height: 500,
      }
    },
    mounted() {
      this.editorResize();
      window.addEventListener("resize", this.editorResize);
      // 禁用右键菜单
      this.$el.oncontextmenu = function (e) {
        return false;
      }
    },
    watch: {
      $route(val) {
        this.init();
      }
    },
    methods: {
      editorResize() {
        this.$store.state.editor.vWidth = this.$el.clientWidth - 350;
        this.$store.state.editor.vHeight = this.$el.clientHeight - 61;
      },
      init() {
        if (this.$route && this.$route.params.id) {
          this.loaded = true;
          this.id = this.$route.params.id;
          this.$store.dispatch('editor/load', {id: this.id});
        }
      }
    }
  }
</script>
<style scoped>
  #editor {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
