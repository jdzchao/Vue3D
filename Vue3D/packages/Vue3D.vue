<template></template>
<script>
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
      if (!this.$vue3d && this.$parent.hasOwnProperty('scene')) {
        this.$vue3d = this.$parent;
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
      }
    },
    methods: {
      render() {
        this.$vue3d.render();
      }
    }
  }
</script>
