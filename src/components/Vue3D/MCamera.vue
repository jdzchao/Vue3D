<template>
  <div id="MCamera" :aspect="aspect"></div>
</template>
<script>
  const THREE = require('three');
  import _MCom from './_MCom.vue'

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
        near: 1,
        far: 1000,
        dis: 100,
        size: 100,
//        aspect: this.width / this.height
      }
    },
    created() {
      if (this.type === 'Perspective') {
        this.$store.state.vue3d.camera = new THREE.PerspectiveCamera(this.fov(), this.width / this.height, this.near, this.far);
      }
      this.camera.position.z = this.dis + this.size * 2;
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
        let vertical = this.size;
        if (this.aspect < 1) {
          vertical = vertical / this.aspect;
        }
        return Math.atan(vertical / this.dis / 2) * (180 / Math.PI);
      },
      updateCamera() {
        this.camera.fov = this.fov();
        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();
      },
    }
  }
</script>
