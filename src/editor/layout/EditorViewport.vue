<template>
  <div id="editor-viewport" :style="style">
    <main-scene v-if="loaded" :width="vWidth" :height="vHeight"></main-scene>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import MainScene from "../panel/MainScene";

  export default {
    name: "EditorViewport",
    components: {MainScene},
    computed: {
      ...mapState({
        vWidth: state => state.editor.vWidth,
        vHeight: state => state.editor.vHeight,
        loaded: state => state.editor.loaded
      }),
      style() {
        return {width: this.vWidth + 'px', height: this.vHeight + 'px'}
      }
    }
  }
</script>

<style scoped>
  #editor-viewport {
    float: left;
    overflow: hidden;
    background-color: #000000;
  }
</style>
