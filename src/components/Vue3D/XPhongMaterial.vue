<template>
  <div id="XMaterial">
  </div>
</template>
<script>
  const THREE = require('three');
  import _XCom from './_XCom.vue'

  export default {
    name: 'XPhoneMaterial',
    mixins: [_XCom],
    props: {
      color: {type: String},
      cMap: {type: String}, // color map
      sMap: {type: String}, // specular map
      nMap: {type: String}, // normal map
    },
    data () {
      return {
        material: new THREE.Material(),
      }
    }
  }
</script>
<style scoped>

</style>
