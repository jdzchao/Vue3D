<template></template>

<script>
  export default {
    name: "w-mixin",
    data() {
      return {
        root: null, // 当前根节点
      }
    },
    created() {
      if (!this.root) {
        this.mnt(this.$parent)
      }
    },
    methods: {
      mnt(obj) {
        if (obj.$options.name === "v-scene" && obj.hasOwnProperty('scene')) {
          this.root = obj;
        } else {
          console.warn(this.$options.name + " should mounted on v-scene node");
          this.mnt(obj.$parent);
        }
      },
      render() {
        if (this.root) {
          this.root.render()
        }
      }
    }
  }
</script>
