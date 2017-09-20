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
      material: {type: String, default: 'MeshPhong'},
      map: String,
    },
    data() {
      return {
        loader: new THREE.OBJLoader(),
        object: null,
        xMaterial: null,
        texture: null,
      }
    },
    computed:{
        _parent(){
          return this.$parent.tGroup ? this.$parent.tGroup : this.scene;
        }
    },
    created(){
      this.LoaderModel();
      this.LoadMaterial();
      this.LoadMap();
    },
    mounted(){
      console.log(this.$parent);
    },
    updated(){
      console.log("update")
    },
    watch:{
      object(val, oldVal){
        if(oldVal !== null)
            this._parent.remove(oldVal);

        this._parent.add(val);
        this.SetMaterial();
        this.Adjust(val);
      },
      xMaterial(val){
          this.SetMaterial();
      },
      material(){
          this.LoadMaterial();
      },
      map(){
          this.LoadMap();
      }
    },
    methods:{
      LoaderModel(){
        if(!this.path) return;
        let that = this;
        this.loader.load( this.path , object => {

          this.object = object;
          console.log(object);

          this.$emit( 'on-load' );

        }, err => {

          this.$emit( 'on-error', err );

        });
      },
      LoadMaterial(){
        let materialStr = this.material.toLowerCase();
        switch (materialStr) {
          case 'meshphong':
            this.xMaterial = new THREE.MeshPhongMaterial();
            break;
          case 'meshbasic':
            this.xMaterial = new THREE.MeshBasicMaterial();
            break;
          case  'meshlambert':
            this.xMaterial = new THREE.MeshLambertMaterial();
            break;
        }
        if(this.texture)
            this.xMaterial.map = this.texture;
      },
      LoadMap(){
        if(this.map && this.xMaterial){
          let texture = new THREE.TextureLoader().load(this.map , function ( texture ) {
            this.xMaterial.map = texture;
            this.texture = texture;
            this.render();                  //render
          }.bind(this));
        }
      },
      SetMaterial(){
        if(this.object && this.xMaterial){
          this.object.traverse(function (child) {
            child.material = this.xMaterial;
          }.bind(this));
          this.render();                //render
        }
      },
      Adjust(object){
          this.SetScale(object);
          this.SetCenter(object);
      },
      GetSize(object) {
        let box = new THREE.Box3();
        box.setFromObject(object);
        return box.getSize();
      },
      SetCenter(object) {
        let box = new THREE.Box3();
        box.setFromObject(object);
        let center = box.getCenter();
        object.position.x -= center.x;
        object.position.y -= center.y;
        object.position.z -= center.z;
      },
      SetScale(object) {
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
