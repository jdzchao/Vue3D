<template>
  <div id="editor-viewport">
    <editor-scene v-if="loaded" :width="width" :height="height"></editor-scene>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import EditorScene from "../panel/EditorScene";

  export default {
    name: "EditorViewport",
    components: {EditorScene},
    props: {
      width: {type: Number, default: 500},
      height: {type: Number, default: 500}
    },
    computed: {
      ...mapState({
        loaded: state => state.editor.loaded
      })
    }
  }
</script>

<style scoped>
  #editor-viewport {
    float: left;
    width: calc(100% - 350px);
    height: calc(100% - 100px);
    overflow: hidden;
    background-color: #000000;
  }
</style>
