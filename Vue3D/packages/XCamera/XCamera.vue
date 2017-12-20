<template>
  <div id="XCamera" :aspect="aspect" style="display:none;">
    <slot v-if="slot"></slot>
  </div>
</template>
<script>
  const THREE = require('three');
  import XMixin from '../_mixins/XMixin'

  export default {
    name: 'x-camera',
    mixins: [XMixin],
    props: {
      type: {type: String, default: 'Perspective'},
      width: Number,
      height: Number,
      near: {type: Number, default: 1},
      far: {type: Number, default: 1000},
      dis: {type: Number, default: 100},
      size: {type: Number, default: 100},
    },
    created() {
      if (this.type === 'Perspective') {
        this.object3d = new THREE.PerspectiveCamera(this.fov(), this.width / this.height, this.near, this.far);
      }
      this.object3d.position.z = this.dis + this.size * 2;
      this.object3d.target = new THREE.Vector3();
      this.root.rendererDelegationAdd(this.renderCamera);
      this.root.camera = this.object3d;
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
        this.$emit('update', this.object3d);
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
        this.object3d.fov = this.fov();
        this.object3d.aspect = this.aspect;
        this.object3d.updateProjectionMatrix();
      }
    }
  }
</script>
