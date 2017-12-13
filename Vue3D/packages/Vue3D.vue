<template></template>
<script>
  const THREE = require('three');
  export default {
    props: {
      group: {type: Object}
    },
    data() {
      return {
        object: null,
      }
    },
    created() {
      if (!this.$vue3d.scene) {
        this.$vue3d.scene = new THREE.Scene();
      }
    },
    updated() {
      this.render();
    },
    destroyed() {
      this._group.remove(this.object);
    },
    computed: {
      _group() {
        if (!this.group) {
          return this.$vue3d.scene;
        } else {
          return this.group;
        }
      },
      $vue3d() {
            return this.$parent.value;
      }
    },
    methods: {
      render() {
        this.$vue3d.render();
      }
    }
  }
</script>
