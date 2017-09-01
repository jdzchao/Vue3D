<template>
  <div id="MScene">
  </div>
</template>
<script>
  export default {
    name: 'MScene',
    data() {
      return {
        height: this.$store.state.height - this.$store.state.rem,
        width: this.$store.state.width
      }
    },
    mounted() {
    },
  }
</script>
<style>
  #MScene {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000000;
  }
</style>
