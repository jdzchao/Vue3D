<template>
</template>
<script>
  const THREE = require('three');
  THREE.ObjLoader = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../node_modules/three/examples/js/loaders/OBJLoader');
  import _XCom from './_XCom.vue'

  export default {
    name: 'XObjLoader',
    mixins: [_XCom],
    props: {
      path: {type: String},
      name: {type: String, default: 'main'},
    },
    data() {
      return {}
    }
  }
</script>
