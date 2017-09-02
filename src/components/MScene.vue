<template>
  <canvas id="canvas" class="canvas"></canvas>
</template>
<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../node_modules/three/examples/js/controls/OrbitControls');

  import {mapState} from 'vuex';
  import ThreeUtils from '../utils/three'
  import scene from '../config/scene'

  export default {
    name: 'MScene',
    props: {
      height: Number,
      width: Number,
      controllable: {type: Boolean, default: true}
    },
    data() {
      return {
        aspect: this.width / this.height,
        tick: null,
        backgroundColor: scene.backgroundColor,
        backgroundAlpha: scene.backgroundAlpha,
      }
    },
    mounted() {
      this.$store.state.scene = new THREE.Scene();
      this.$store.state.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$el
      });
      this.$store.state.camera = new THREE.PerspectiveCamera(this.fov(), this.width / this.height, scene.near, scene.far);
      this.camera.position.z = scene.dis + scene.size * 2;
      this.camera.target = new THREE.Vector3();

      this.$store.commit('RendererDelegation', this.updateRenderer);
      this.$store.commit('RendererDelegation', this.updateControls);

      this.Resize();
      this.$emit('onReady', true);
    },
    computed: {
      ...mapState(['scene', 'camera', 'renderer']),
    },
    watch: {
      width() {
        this.Resize();
      },
      height() {
        this.Resize();
      }
    },
    methods: {
      fov() {
        return ThreeUtils.calcFov(scene.dis, scene.size, this.width / this.height);
      },
      updateCamera() {
        let camera = this.camera;
        camera.fov = this.fov();
        camera.aspect = this.width / this.height;
        camera.updateProjectionMatrix();
      },
      updateRenderer() {
        let renderer = this.$store.state.renderer;
        renderer.setSize(this.width, this.height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
        renderer.setClearAlpha(this.backgroundAlpha);
      },
      updateControls() {
        if (this.controllable && this.controls) return;
        if (this.controllable) {
          if (this.controls) return;
          this.controls = new THREE.OrbitControls(this.camera, this.$el);
          this.controls.addEventListener('change', this.render, false);
          this.controls.type = 'orbit';
          this.controls.minDistance = scene.near;
          this.controls.maxDistance = scene.far - 100;
        } else {
          if (this.controls) {
            this.controls.dispose();
            this.controls = null;
          }
        }
      },
      // 渲染帧
      render() {
        if (this.tick) return;
        this.tick = requestAnimationFrame(() => {
          this.tick = null;
          this.$store.commit('Render');
          this.renderer.render(this.scene, this.camera);
        })
      },
      Resize() {
        this.aspect = this.width / this.height;
        this.render();
      },
    },
    beforeDestroy() {
      this.$el.removeEventListener('mousedown', this.onMouseDown, false);
      this.$el.removeEventListener('mousemove', this.onMouseMove, false);
      this.$el.removeEventListener('mouseup', this.onMouseUp, false);
      this.$el.removeEventListener('click', this.onClick, false);
    },
  }
</script>
