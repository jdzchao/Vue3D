<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
  import Index from './modules/Index.vue'

  export default {
    name: 'app',
    components: {Index},
    data() {
      return {
        rem: document.body.clientHeight * 0.06
      }
    },
    created() {
      this.WindowResize();
      window.addEventListener("resize", this.WindowResize);
      console.log(this.$store.state.lifecycle.steps);
    },
    mounted() {
      this.$store.commit('lifecycle/NextStep');
    },
    methods: {
      WindowResize() {
        this.rem = document.body.clientHeight * 0.06;
        document.documentElement.style.fontSize = this.rem + "px";
        this.$store.state.width = document.body.clientWidth;
        this.$store.state.height = document.body.clientHeight;
        this.$store.state.rem = this.rem;
      }
    }
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
</style>
