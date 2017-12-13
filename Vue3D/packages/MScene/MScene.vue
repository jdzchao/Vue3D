<template>
  <div>
    <slot v-if="isSlot"></slot>
  </div>
</template>

<script>
  import vue3d from '../../packages/Vue3D.js'
  const THREE = require('three');
  export default {
    name: 'm-scene',
    data() {
      return {
        isSlot: false
      }
    },
    computed: {
    },
    props: {
      value: {},
    },
    created() {
      let _vue3d = new vue3d();
      _vue3d.size = 100;
      _vue3d.scene = new THREE.Scene();
      this.$emit('input', _vue3d);
      console.log(this.value)
    },
    watch: {
      value(val) {
        if(!!val) {
          if(val instanceof vue3d)
            this.isSlot = true;
          else
            console.warn("error scene --- @vue3d");
        }
      }
    }
  }
</script>

<style scoped>

</style>
