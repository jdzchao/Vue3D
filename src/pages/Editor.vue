<template>
  <div id="editor">
    <editor-header></editor-header>
    <editor-viewport :width="width" :height="height"></editor-viewport>
    <editor-tools></editor-tools>
    <editor-footer></editor-footer>
  </div>
</template>

<script>
  import EditorHeader from "../editor/layout/EditorHeader";
  import EditorViewport from "../editor/layout/EditorViewport";
  import EditorTools from "../editor/layout/EditorTools";
  import EditorFooter from "../editor/layout/EditorFooter";

  export default {
    components: {
      EditorFooter,
      EditorTools,
      EditorHeader,
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
      window.addEventListener("resize", () => {
        this.editorResize();
      });
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
        this.width = this.$el.clientWidth - 350;
        this.height = this.$el.clientHeight - 120;
        console.log(this.width, this.$el.clientHeight);
      },
      init() {
        if (this.$route && this.$route.params.id) {
          this.loaded = true;
          this.id = this.$route.params.id;
          this.$store.dispatch('tddz/load', {id: this.id});
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
