<template>
  <canvas id="canvas" class="canvas" :state="state"></canvas>
</template>
<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../../node_modules/three/examples/js/controls/OrbitControls');

  export default {
    name: 'XScene',
    props: {
      height: Number,
      width: Number,
    },
    data() {
      return {
        // 场景
        scene: new THREE.Scene(),
        // 相机
        camera: new THREE.PerspectiveCamera(57, 1, 1, 1000),
        //场景盒子
        group: new THREE.Group(),
        //渲染器
        renderer: null,
        //射线
        raycaster: new THREE.Raycaster(),
        //鼠标点
        mouse: new THREE.Vector2(),
        //控制器
        controls: this.resize,
        backgroundColor: "#ff0000",
        backgroundAlpha: 1,
      }
    },
    mounted() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$el
      });
      this.updateRenderer();
    },
    computed: {
      state() {
        if (this.$store.state.process === 'render') {
          this.$store.state.scene = this.scene;
          this.$store.commit('UpdateSceneDelegation', this.updateRenderer);
          this.$store.commit('LoadingNext');
          this.$store.commit('UpdateScene');
          return true;
        }
        return false;
      }
    },
    watch: {
      height: function () {
        this.$nextTick(() => {
          this.renderer.setSize(this.width, this.height);
        })
      }
    },
    methods: {
      updateRenderer() {
        let renderer = this.renderer;
        renderer.setSize(this.width, this.height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
        renderer.setClearAlpha(this.backgroundAlpha);
      },
    }
  }
</script>
<style scoped>

</style>
