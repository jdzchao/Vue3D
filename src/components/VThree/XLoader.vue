<template></template>
<script>
  const THREE = require('three');
  THREE.ObjLoader = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../../node_modules/three/examples/js/loaders/OBJLoader');
  import scene from '../../config/scene'
  import ThreeUtils from '../../utils/three'

  export default {
    name: 'XLoader',
    props: {
      hash: String,
      name: {type: String, default: 'body'},
      type: {type: String, default: 'body'},
      format: {type: String, default: 'obj'},
      x: {type: Number, default: 0},
      y: {type: Number, default: 0},
      z: {type: Number, default: 0},
      scale: {type: Number, default: 1},
      shininess: {type: Number, default: 30},
      color: {type: String, default: 'rgb(255,255,255)'},
    },
    data() {
      return {
        scene: this.$store.state.scene,
        manager: new THREE.LoadingManager(),
        path: '',
        unit: null,
        object: null,
        material: null,
      }
    },
    watch: {
      hash(val) {
        this.$nextTick(() => {
          this.AnalysisModel(val);
        });
      }
    },
    methods: {
      AnalysisModel(hash) {
        this.$http.get(this.$api.unit, {
          params: {
            hash: hash,
            uv: true
          }
        }).then((res) => {
          if (res.data.code = 20000) {
            this.unit = res.data.data;
            this.StorageUnit();
          }
        });
        this.path = this.$api.model_show + hash + '.' + this.format;
        this.LoadObj();
      },
      LoadObj() {
        const objLoader = new THREE.OBJLoader(this.manager);
        objLoader.load(this.path, (object) => {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = this.Material();
            }
          });
          this.object = object;
          this.SetObject();
        }, this.Process);
      },
      Material() {
        this.material = new THREE.MeshPhongMaterial({
//          shading: THREE.SmoothShading, // 官方过时方法
          flatShading: false,
          shininess: this.shininess,
          color: this.color,
        });
        this.$store.state.materials[this.name] = this.material;
        return this.material;
      },
      SetObject() {
        this.object.name = this.name;
        if (this.type === 'body') {
          this.$store.state.target = this.object;
//          console.log(this.$store.state.target.name);
        }
        this.Adaptive();
        this.Adjust();
        this.scene.add(this.object);
        this.$emit('ComponentLoaded', true);
      },
      StorageUnit() {
        sessionStorage.setItem('unit_' + this.name, JSON.stringify(this.unit));
      },
      Adaptive() {
        let scale = 1;
        let size = ThreeUtils.getSize(this.object);
        if (size.z > scene.size) {
          scale *= scene.size / size.z;
          size.multiplyScalar(scale);
        }
        if (size.x / size.y > this.$store.state.aspect) {
          scale *= scene.size / size.x;
          size.multiplyScalar(scale);
        } else {
          scale *= scene.size / size.y / this.$store.state.aspect;
          size.multiplyScalar(scale);
        }
        this.object.scale.set(scale, scale, scale);

      },
      Adjust() {
        this.SetCenter();
      },
      SetCenter() {
        let center = ThreeUtils.getCenter(this.object);
        this.object.position.x -= center.x;
        this.object.position.y -= center.y;
        this.object.position.z -= center.z;
      },
      Process(val) {
//        console.log(val)
      }
    }
  }
</script>
