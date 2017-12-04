<template></template>
<script>
  const THREE = require('three');
  THREE.OBJLoader = require('imports-loader?THREE=three!exports-loader?THREE.OBJLoader!./OBJLoader');
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'x-obj-loader',
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
      this.loadObj(this.path);
    },
    destroyed() {
      this.$vue3d.scene.remove(this.object);
    },
    watch: {
      path(val) {
        this.loadObj(val);
      },
      object(val, oldVal) {
        if (oldVal !== null)
          this.$vue3d.scene.remove(oldVal);
        this.$vue3d.scene.add(val);
        this.$vue3d.placeZeroPoint(val);
        this.$vue3d.adaptScale(val);
        this.render();
      },
      material(val, oldVal) {
        if (oldVal !== val && oldVal !== null) {
          this.setMaterial();
        }
      }
    },
    methods: {
      loadObj(path) {
        if (!path) return;
        const objLoader = new THREE.OBJLoader(this.manager);
        objLoader.load(path, object => {
          this.object = object;
          this.setMaterial();
          this.loaded(object);
        }, xhr => {
          this.process(xhr);
        }, err => {
          this.error(err);
        });
      },
      setMaterial() {
        if (this.object && this.material) {
          this.object.traverse(function (child) {
            child.material = this.material;
          }.bind(this));
          this.render();
        }
      },
      loaded(object) {
        this.$emit('loaded', object);
      },
      process(xhr) {
        this.$emit('process', xhr);
      },
      error(err) {
        this.$emit('error', err);
      }
    }
  }
</script>
