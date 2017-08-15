<template></template>
<script>
  const THREE = require('three');
  THREE.ObjLoader = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../../node_modules/three/examples/js/loaders/OBJLoader');
  export default {
    name: 'XLoader',
    props: {
      group: Number,
      obj: Object
    },
    data() {
      return {}
    }
  }
</script>
