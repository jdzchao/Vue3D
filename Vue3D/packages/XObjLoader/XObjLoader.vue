<template></template>
<script>
  const THREE = require('three');
  THREE.OBJLoader = require('imports-loader?THREE=three!exports-loader?THREE.OBJLoader!./OBJLoader');
  import Vue3D from '../Vue3D.vue'

  export default {
    name: 'x-obj-loader',
    mixins: [Vue3D],
    props: {
      group: {type: Object},
      path: {type: String},
      name: {type: String, default: 'vue3d'},
      material: {type: Object},
      position: {type: Object},
      scale: {type: Object},
      rotate: {type: Object},
    },
    data() {
      return {
        _group: {},
        manager: new THREE.LoadingManager(),
        object: null,
      }
    },
    created() {
      if (!this.group) {
        this._group = this.$vue3d.scene;
      }
    },
    mounted() {
      this.loadObj(this.path);
    },
    destroyed() {
      this._group.remove(this.object);
    },
    watch: {
      path(val) {
        this.loadObj(val);
      },
      group(val) {
        if (!val) {
          this._group = val;
        }
      },
      object(val, oldVal) {
        if (oldVal !== null)
          this._group.remove(oldVal);
        this._group.add(val);
        this.setMaterial();
        this.adjust();
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
      adjust() {
        if (!this.position) {
          this.$vue3d.placeZeroPoint(this.object);
        }
        if (!this.scale) {
          this.$vue3d.adaptScale(this.object);
        }
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
