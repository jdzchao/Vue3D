<template>
  <canvas title="VScene">
    <slot v-if="ready"></slot>
  </canvas>
</template>

<script>
  import Scene from '../VScene/VScene'
  const THREE = require("three");
  export default {
    name: "v-scene",
    mixins: [Scene],
    data() {
      return {
        skyGeometry: null,
        panoramaScene: null,
        panoramaCamera: null
      }
    },
    props: ["panoramaImg"],
    created() {
      this.panoramaScene = new THREE.Scene();
      this.panoramaCamera = new THREE.PerspectiveCamera( 70, this.width / this.height, 1, 100000 );
    },
    mounted() {
      this.renderer.autoClear = false;
      this.renderer.setFaceCulling( THREE.CullFaceNone );
      this.rendererDelegationAdd(function () {
        this.panoramaCamera.aspect = window.innerWidth / window.innerHeight;
        this.panoramaCamera.updateProjectionMatrix();
        this.panoramaCamera.rotation.copy( this.camera.rotation );
        this.renderer.render( this.panoramaScene, this.panoramaCamera );
      }.bind(this));
      this.setSky();
    },
    watch: {
      panoramaImg(val) {
        this.setSky();
      }
    },
    methods: {
      setSky() {

        if(!this.panoramaImg)
          return;
        this.panoramaScene.background = null;
        if(this.skyGeometry)
          this.panoramaScene.remove(this.skyGeometry);
        if(toString.call(this.panoramaImg) === '[object Array]' && this.panoramaImg.length === 6){
          this.loadSixImg();
        }else if(typeof this.panoramaImg === 'string')
          this.loadOneImg();
        else
          console.warn("type panoramaImg should == string or array(length == 6)")

      },
      loadOneImg() {

        let geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
        new THREE.TextureLoader().load( this.panoramaImg, function (texture) {
          this.skyGeometry = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide,
            depthWrite: false,
          }));
          this.panoramaScene.add(this.skyGeometry);
          this.render()
        }.bind(this));

      },
      loadSixImg() {

        let loader = new THREE.CubeTextureLoader().setPath( '../../../static/images/' );
        loader.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] ,function (texture) {

          this.panoramaScene.background = texture;
          this.render();

        }.bind(this));

      }
    },
  }
</script>

<style scoped>

</style>
