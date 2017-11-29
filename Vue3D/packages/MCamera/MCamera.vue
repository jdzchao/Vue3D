<template>
  <div id="MCamera" :aspect="aspect"></div>
</template>
<script>
  const THREE = require('three');
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'MCamera',
    mixins: [Vue3D],
    props: {
      type: {type: String, default: 'Perspective'},
      width: Number,
      height: Number,
    },
    data() {
      return {
        camera: '',
        near: 1,
        far: 1000,
        dis: 100,
        size: 100,
      }
    },
    created() {
      if (this.type === 'Perspective') {
        this.$vue3d.camera = new THREE.PerspectiveCamera(this.fov(), this.width / this.height, this.near, this.far);
      }
      this.$vue3d.camera.position.z = this.dis + this.size * 2;
      this.$vue3d.camera.target = new THREE.Vector3();
      this.$vue3d.rendererDelegationReg(this.renderCamera);
    },
    computed: {
      aspect() {
        this.$nextTick(() => {
          this.updateCamera(); // 重置相机相关配置
          this.render();
        });
        return this.width / this.height;
      }
    },
    methods: {
      renderCamera() {
        this.camera = this.$vue3d.camera;
        this.$emit('update', this.camera);
      },
      fov() {
        let vertical = this.size;
        if (this.aspect < 1) {
          vertical = vertical / this.aspect;
        }
        return Math.atan(vertical / this.dis / 2) * (180 / Math.PI);
      },
      updateCamera() {
        this.$vue3d.camera.fov = this.fov();
        this.$vue3d.camera.aspect = this.aspect;
        this.$vue3d.camera.updateProjectionMatrix();
      }
    }
  }
</script>
