<template>
  <div>
    <slot>Group nothing！！！</slot>
  </div>
</template>

<script>
  const THREE = require('three');
  import _XCom from './_XCom.vue'
  export default {
    name: 'XGroup',
    mixins: [_XCom],
    data () {
      return {
          tGroup: new THREE.Group(),
      }
    },
    computed:{
      _parent(){
        return this.$parent.tGroup ? this.$parent.tGroup : this.scene;
      }
    },
    created(){
      this._parent.add(this.tGroup);
      this.$emit('input', this.tGroup);
    }
  }
</script>

<style scoped>

</style>
