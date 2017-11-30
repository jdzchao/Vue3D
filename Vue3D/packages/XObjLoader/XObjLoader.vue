<template></template>
<script>
  const THREE = require('three');
  THREE.OBJLoader = require('imports-loader?THREE=three!exports-loader?THREE.OBJLoader!./OBJLoader');
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'XObjLoader',
    mixins: [Vue3D],
    props: {
      path: {type: String},
      name: {type: String, default: 'vue3d'},
      material: {type: Object},
      position: {type: Object},
      scale: {type: Object},
      rotate: {type: Object}
    },
    data() {
      return {
        manager: new THREE.LoadingManager(),
        object: null,
      }
    },
    mounted() {
      this.LoadObj(this.path);
    },
    watch: {
      path(val) {
        this.LoadObj(val);
      },
      object(val, oldVal) {
        if (oldVal !== null)
          this.$vue3d.scene.remove(oldVal);
        this.$vue3d.scene.add(val);
        this.$vue3d.placeZeroPoint(val);
        this.$vue3d.adaptScale(val);
        this.render();
      }
    },
    methods: {
      LoadObj(path) {
        if (!path) return;
        const objLoader = new THREE.OBJLoader(this.manager);
        objLoader.load(path, object => {
          this.object = object;
          this.SetMaterial();
          this.$emit('loaded');
        }, xhr => {
          this.$emit('process', xhr);
        }, err => {
          this.$emit('error', err);
        });
      },
      SetMaterial() {
        if (this.object && this.material) {
          this.object.traverse(function (child) {
            child.material = this.material;
          }.bind(this));
          this.render();
        }
      }
    }
  }
</script>
