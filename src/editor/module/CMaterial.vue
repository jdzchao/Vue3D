<template>
  <object type="material" :loaded="completed"></object>
</template>

<script>
  import {mapState} from 'vuex'
  import * as THREE from 'three'
  import {imagePath} from "../config/api"
  import {fabric} from 'fabric'

  export default {
    name: "c-material",
    props: {
      name: {type: String,},
      customizable: {type: Number, default: false},
      canvas_color: {type: Boolean, default: false},
      canvas_normal: {type: Boolean, default: false},
      canvas_specular: {type: Boolean, default: false},
    },
    data() {
      return {
        material: {},
        map_color: "",
        map_normal: "",
        map_specular: "",
        canvas_color_data: {},
        canvas_normal_data: {},
        canvas_specular_data: {},
        status: 0,
        bgColor: "rgba(255,255,255,1)",
        loaded: false
      }
    },
    mounted() {
      this.setMaterial(this.name);
    },
    computed: {
      ...mapState({
        materials: state => state.editor.materials,
      }),
      completed() {
        if (this.loaded && this.status === 0) {
          this.done();
        }
      }
    },
    watch: {
      name(val) {
        this.setMaterial(val);
      },
      map_color(val) {
        this.status++;
        if (this.canvas_color && this.customizable > 0) {
          this.loadImage(imagePath(val), (res) => {
            let cvs = new canvas(this.bgColor, res);
            this.canvas_color_data = cvs;
            this.material.map = new THREE.Texture(cvs.dom);
            this.material.map.name = val;
            this.material.map.needsUpdate = true;
            this.status--;
          })
        } else {
          new THREE.TextureLoader().load(imagePath(val), (res) => {
            this.material.map = res;
            this.material.map.name = val;
            this.material.map.needsUpdate = true;
            this.status--;
          }, null, (err) => {
            this.status--;
          });
        }
      },
      map_normal(val) {
        this.status++;
        if (this.canvas_normal && this.customizable) {
          // TODO: 编辑法线图，实现可雕刻定制
        } else {
          new THREE.TextureLoader().load(imagePath(val), (res) => {
            res.name = val;
            this.material.normalMap = res;
            this.material.normalMap.needsUpdate = true;
            this.status--;
          }, null, (err) => {
            this.status--;
          });
        }
      },
      map_specular(val) {
        this.status++;
        if (this.canvas_specular && this.customizable) {
        } else {
          new THREE.TextureLoader().load(imagePath(val), (res) => {
            res.name = val;
            this.material.specularMap = res;
            this.material.specularMap.needsUpdate = true;
            this.status--;
          }, null, (err) => {
            this.status--;
          });
        }
      }
    },
    methods: {
      setMaterial(val) {
        if (this.materials.hasOwnProperty(val)) {
          this.loaded = false;
          let material = this.materials[val];
          this.map_color = material.map_color;
          this.map_normal = material.map_normal;
          this.map_specular = material.map_specular;
          if (empty(material.mtl)) {
            if (material.type === 'phong') {
              this.material = this.phong(material);
            }
          } else {
            this.material = this.materials[val].mtl;
          }
          this.loaded = true;
        }
      },
      phong(opt) {
        let phong = new THREE.MeshPhongMaterial({});
        phong.flatShading = Number(opt.flat_shading) > 0;
        phong.shininess = Number(opt.shininess) || 30;
        if (opt.specular) {
          phong.specular = new THREE.Color(opt.specular);
        }
        if (opt.color) {
          phong.color = new THREE.Color(opt.color);
        }
        phong.transparent = Number(opt.transparent) > 0;
        phong.opacity = Number(opt.opacity) || 1;
        phong.needsUpdate = true;
        return phong;
      },
      loadImage(path, callback) {
        if (callback && typeof callback !== 'function') return;
        if (!path) callback(null);
        let object = null;
        fabric.util.loadImage(path, (img) => {
          object = new fabric.Image(img, {
            crossOrigin: "anonymous",
            hasRotatingPoint: false,
            transparentCorners: false,
          });
          callback(object);
        }, null, {crossOrigin: 'anonymous'});
      },
      done() {
        this.loaded = false;
        this.$store.state.editor.materials[this.name].mtl = this.material;
        this.$store.state.editor.materials[this.name].customizable = this.customizable;
        if (this.canvas_color_data.hasOwnProperty('canvas')) {
          this.$store.state.editor.materials[this.name].canvas_color = this.canvas_color_data;
        }
        this.$emit("loaded", this.material);
      },
    }
  }

  class canvas {
    constructor(bgColor, bg) {
      this.bgColor = bgColor;
      this.w = 1024;
      this.h = 1024;
      this.dom = document.createElement('canvas');
      this.canvas = new fabric.StaticCanvas(this.dom);
      this.canvas.renderOnAddRemove = true;
      this.canvas.setBackgroundColor(this.bgColor, this.canvas.renderAll.bind(this.canvas));
      this.canvas.setDimensions({width: this.w, height: this.h});
      if (bg) {
        this.canvas.backgroundImage = bg;
      }
      this.dom.height = 1024;
      this.dom.width = 1024;
      this.group = [];
      this.canvas.renderAll();
      return this;
    }

    addGroup(group, id) {
      if (this.group[id])
        this.canvas.remove(this.group[id]);
      this.group[id] = group;
      this.canvas.add(this.group[id]);
    }
  }
</script>
