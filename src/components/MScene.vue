<template>
  <canvas id="canvas" class="canvas" :aspect="aspect"></canvas>
</template>
<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../node_modules/three/examples/js/controls/OrbitControls');

  import {mapState} from 'vuex';
  import threeUtils from '../utils/three'
  import sceneConf from '../config/scene'

  export default {
    name: 'MScene',
    props: {
      height: Number,
      width: Number,
      controllable: {type: Boolean, default: true}
    },
    data() {
      return {
        tick: null,
        controls: null,
        backgroundColor: sceneConf.backgroundColor,
        backgroundAlpha: sceneConf.backgroundAlpha,
      }
    },
    mounted() {
      this.$store.state.three.scene = new THREE.Scene();
      this.$store.state.three.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$el
      });
      this.$store.state.three.camera = new THREE.PerspectiveCamera(this.fov(), this.width / this.height, sceneConf.near, sceneConf.far);
      this.camera.position.z = sceneConf.dis + sceneConf.size * 2;
      this.camera.target = new THREE.Vector3();
      this.$store.commit('three/rendererDelegation', this.updateRenderer);
      this.$store.commit('three/rendererDelegation', this.updateControls);

      this.resize();
      this.$emit('onReady', true);
    },
    computed: {
      ...mapState({
        handle: state => state.three.handle,
        scene: state => state.three.scene,
        camera: state => state.three.camera,
        renderer: state => state.three.renderer,
      }),
      aspect() {
        this.$nextTick(() => {
          this.resize();
        });
        return this.width / this.height;
      }
//      ...mapState(['sceneConf', 'camera', 'renderer']),
    },
    methods: {
      fov() {
        return threeUtils.calcFov(sceneConf.dis, sceneConf.size, this.width / this.height);
      },
      updateCamera() {
        this.camera.fov = this.fov();
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
      },
      updateRenderer() {
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
        this.renderer.setClearAlpha(this.backgroundAlpha);
      },
      updateControls() {
        if (this.controllable && this.controls) return;
        if (this.controllable) {
          if (this.controls) return;
          this.controls = new THREE.OrbitControls(this.camera, this.$el);
          this.controls.addEventListener('change', this.render, false);
          this.controls.type = 'orbit';
          this.controls.minDistance = sceneConf.near;
          this.controls.maxDistance = sceneConf.far - 100;
        } else {
          if (this.controls) {
            this.controls.dispose();
            this.controls = null;
          }
        }
      },
      resize() {
        this.updateCamera();
        this.$store.commit('three/render');
      },
      render() {
        this.$store.commit('three/render');
      }
    }
  }
</script>
