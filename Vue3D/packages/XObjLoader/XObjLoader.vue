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
    },
    data() {
      return {
        manager: new THREE.LoadingManager(),
      }
    },
    mounted() {
      this.loadObj(this.path);
    },
    watch: {
      path(val) {
        this.loadObj(val);
      },
      object(val, oldVal) {
        if (oldVal !== null)
          this._group.remove(oldVal);
        this._group.add(val);
        this.setMaterial();
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
          object.name = this.name;
          this.object = object;
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
            if (child.type === 'Mesh' && (child.parent === this._group || child.parent === this.object)) {
              child.material = this.material;
            }
          }.bind(this));
          this.$vue3d.render();
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
