<template>
  <canvas id="canvas" class="canvas" ref="canvas"></canvas>
</template>
<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../node_modules/three/examples/js/controls/OrbitControls');
  import {mapState} from 'vuex'

  export default {
    name: 'XScene',
    data() {
      return {
        width: this.$store.state.width,
        height: this.$store.state.contentHeight,
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
        controls: null,
      }
    },
    mounted() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$el
      });
      this.update();
    },
    computed: {
      ...mapState(['contentHeight'])
    },
    watch: {
      height: function () {
        this.$nextTick(() => {
          this.renderer.setSize(this.width, this.height);
        })
      }
    },
    methods: {
      update() {
        this.updateRenderer();
//        this.updateModel();
//        this.updateCamera();
//        this.updateLights();
//        this.updateControls();

      },
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
