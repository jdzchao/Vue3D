<template></template>
<script>
  export default {
    name: "x-mixin",
    props: {},
    data() {
      return {
        slot: false, // 是否加载挂载点
        root: null, // 当前根节点
        node: null, // 当前挂载节点
        object3d: null, // 当前3D对象
      }
    },
    created() {
      if (!this.root || !this.node) {
        this.mnt(this.$parent)
      }
    },
    updated() {
      this.render();
    },
    destroyed() {
      this.remove3d(this.object3d);
    },
    methods: {
      mnt(obj) {
        if (obj.$options.name === "v-scene" && obj.hasOwnProperty('scene')) {
          this.root = obj;
          this.node = obj;
        } else if (obj.hasOwnProperty('root') && obj.hasOwnProperty('object3d')) {
          this.root = obj.root;
          this.node = obj;
        } else {
          this.mnt(obj.$parent);
        }
      },
      slotIn() {
        this.slot = true;
      },
      add3d(object3d) {
        if (this.node.hasOwnProperty('object3d')) {
          this.node.object3d.add(object3d);
        } else {
          this.root.scene.add(object3d);
        }
      },
      remove3d(object3d) {
        if (this.node.hasOwnProperty('object3d')) {
          this.node.object3d.remove(object3d);
        } else {
          this.root.scene.remove(object3d);
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
