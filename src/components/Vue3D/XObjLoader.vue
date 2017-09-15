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
      name: {type: String, default: 'main'},
      material: {}
    },
    data() {
      return {
        loader: new THREE.OBJLoader(),
      }
    },
    created(){
      this.LoaderModel();
    },
    mounted(){

    },
    methods:{
      LoaderModel(){
        if(!this.path) return;
        let that = this;
        this.loader.load( this.path , object => {

          object.traverse(function (child) {
            child.material = new THREE.MeshPhongMaterial({
              color: 0xffffff,
            });
          });

          console.log(object);

          this.scene.add(object);
          this.Adjust(object);

          this.render();
          this.$emit( 'on-load' );

        }, err => {

          this.$emit( 'on-error', err );

        });
      },
      Adjust(object){
          this.SetScale(object);
          this.SetCenter(object);
      },
      GetSize: function (object) {
        let box = new THREE.Box3();
        box.setFromObject(object);
        return box.getSize();
      },
      SetCenter: function (object) {
        let box = new THREE.Box3();
        box.setFromObject(object);
        let center = box.getCenter();
        object.position.x -= center.x;
        object.position.y -= center.y;
        object.position.z -= center.z;
      },
      SetScale(object) {
        let scale = 1;
        let scene_size = _Config.camera.size;
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
