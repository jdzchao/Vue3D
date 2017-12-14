<template>
  <div id="MCamera" :aspect="aspect" style="display:none;"></div>
</template>
<script>
  const THREE = require('three');

  export default {
    name: 'm-camera',
    props: {
      type: {type: String, default: 'Perspective'},
      width: Number,
      height: Number,
      near: {type: Number, default: 1},
      far: {type: Number, default: 1000},
      dis: {type: Number, default: 100},
      size: {type: Number, default: 100},
    },
    data() {
      return {
        $vue3d: null
      }
    },
    created() {
      if (!this.$vue3d) {
        this.$vue3d = this.$parent;
      }
      if (this.type === 'Perspective') {
        this.$vue3d.camera = new THREE.PerspectiveCamera(this.fov(), this.width / this.height, this.near, this.far);
      }
      this.$vue3d.camera.position.z = this.dis + this.size * 2;
      this.$vue3d.camera.target = new THREE.Vector3();
      this.$vue3d.rendererDelegationAdd(this.renderCamera);
    },
    computed: {
      aspect() {
        this.$nextTick(() => {
          this.updateCamera(); // 重置相机相关配置
          this.$vue3d.render();
        });
        return this.width / this.height;
      }
    },
    methods: {
      renderCamera() {
        this.$emit('update', this.$vue3d.camera);
      },
      fov() {
        let size = this.size;
        if (this.aspect < 1) {
          size = size / this.aspect;
        } else {
          size = size * this.aspect;
        }
        return Math.atan(size / this.dis / 2) * (180 / Math.PI);
      },
      updateCamera() {
        this.$vue3d.camera.fov = this.fov();
        this.$vue3d.camera.aspect = this.aspect;
        this.$vue3d.camera.updateProjectionMatrix();
      }
    }
  }
</script>
