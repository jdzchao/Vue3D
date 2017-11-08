<template>
</template>
<script>
  const THREE = require('three');
  THREE.OBJLoader = require('imports-loader?THREE=three!exports-loader?THREE.OBJLoader!../../../node_modules/three/examples/js/loaders/OBJLoader');
  import _XCom from './_XCom.vue'
  import _Config from '../../config/vue3d'

  export default {
    name: 'XObjLoader',
    mixins: [_XCom],
    props: {
      path: {type: String},
      name: {type: String, default: 'vue3d'},
      material: {type: Object},
    },
    data () {
      return {
        manager: new THREE.LoadingManager(),
        object: null,
      }
    },
    mounted () {
      this.LoadObj();
    },
    updated () {
      console.log("update")
    },
    watch: {
      path (val) {
        console.log(val);
        this.LoadObj();
      },
      object (val, oldVal) {
        if (oldVal !== null)
          this.scene.remove(oldVal);
        this.scene.add(val);
        this.Adjust(val);
        this.render();
      }
    },
    methods: {
      LoadObj () {
        if (!this.path) return;
        const objLoader = new THREE.OBJLoader(this.manager);
        objLoader.load(this.path, object => {
          this.object = object;
          this.$emit('loaded');
        }, xhr => {
          this.$emit('process', xhr);
        }, err => {
          this.$emit('error', err);
        });
      },
      SetMaterial () {
        if (this.object && this.material) {
          this.object.traverse(function (child) {
            child.material = this.material;
          }.bind(this));
          this.render();                //render
        }
      },
      Adjust (object) {
        this.SetScale(object);
        this.SetCenter(object);
      },
      GetSize (object) {
        let box = new THREE.Box3();
        box.setFromObject(object);
        return box.getSize();
      },
      SetCenter (object) {
        let box = new THREE.Box3();
        box.setFromObject(object);
        let center = box.getCenter();
        object.position.x -= center.x;
        object.position.y -= center.y;
        object.position.z -= center.z;
      },
      SetScale (object) {
        let scale = 1;
        let scene_size = _Config.size;
        let size = this.GetSize(object);
        let aspect = this.$store.state.width / this.$store.state.height;

        if (size.x / size.y > aspect) {
          scale *= scene_size / size.x;
          size.multiplyScalar(scale);
        } else {
          scale *= aspect > 1 ? scene_size / size.y : scene_size / size.y / aspect;
          size.multiplyScalar(scale);
        }
        if (size.z > scene_size) {
          scale *= scene_size / size.z;
          size.multiplyScalar(scale);
        }
        object.scale.set(scale, scale, scale);
      },
    }
  }
</script>
