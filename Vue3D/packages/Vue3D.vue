<template></template>
<script>
  const THREE = require('three');

  export default {
    props: {
      group: {type: Object}
    },
    data() {
      return {
        $vue3d: null,
        object: null,
      }
    },
    created() {
      if (!this.$vue3d) {
        this.$vue3d = this.$parent;
      }
      console.log(this.$vue3d);
    },
    updated() {
      this.render();
    },
    destroyed() {
      this._group.remove(this.object);
    },
    computed: {
      // _group() {
      //   if (!this.group) {
      //     return this.$vue3d.scene;
      //   } else {
      //     return this.group;
      //   }
      // }
    },
    methods: {
      render() {
        this.$vue3d.render();
      }
    }
  }
</script>
