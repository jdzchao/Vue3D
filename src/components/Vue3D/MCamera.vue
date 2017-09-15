<template>
  <div id="MCamera" :aspect="aspect"></div>
</template>
<script>
  const THREE = require('three');
  import _MCom from './_MCom.vue'
  import _Config from '../../config/vue3d'

  export default {
    name: 'MCamera',
    mixins: [_MCom],
    props: {
      type: {type: String, default: 'Perspective'},
      width: Number,
      height: Number,
    },
    data() {
      return {
//        aspect: this.width / this.height
      }
    },
    created() {
      if (this.type === 'Perspective') {
        this.$store.state.vue3d.camera = new THREE.PerspectiveCamera(this.fov(), this.width / this.height, _Config.camera.near, _Config.camera.far);
      }
      this.camera.position.z = _Config.camera.dis + _Config.camera.size * 2;
      this.camera.target = new THREE.Vector3();
    },
    computed: {
      aspect() {
        this.$nextTick(() => {
          this.updateCamera(); // 重置相机相关配置
          this.render();
        });
        return this.width / this.height;
      },
    },
    methods: {
      fov() {
        let vertical = _Config.camera.size;
        if (this.aspect < 1) {
          vertical = vertical / this.aspect;
        }
        return Math.atan(vertical / _Config.camera.dis / 2) * (180 / Math.PI);
      },
      updateCamera() {
        this.camera.fov = this.fov();
        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();
      },
    }
  }
</script>
