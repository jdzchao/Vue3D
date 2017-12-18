<template></template>
<script>
  export default {
    props: {
      group: {type: Object}
    },
    data() {
      return {
        isSlot: false,
        $vue3d: null,
        object3d: null,
      }
    },
    created() {
      if (!this.$vue3d) {
        this.$vue3d = this.getNode(this.$parent)
      }
    },
    updated() {
      this.render();
    },
    destroyed() {
      this._group.remove(this.object3d);
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
      getNode(obj) {
        if (obj.$options.name === "v-scene" && obj.hasOwnProperty('scene')) {
          return obj;
        } else {
          return this.getNode(obj.$parent);
        }
      },
      render() {
        this.$vue3d.render();
      }
    }
  }
</script>
