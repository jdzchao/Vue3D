import * as THREE from 'three'
import {fabric} from 'fabric'

const preset = {
  name: '',
  flat_shading: false,
  shininess: 30,
  specular: null,
  color: null,
  transparent: false,
  opacity: 1,
  map_color: null,
  map_normal: null,
  map_specular: null
};

export let shape = {
  rect(obj, color) {
    return new fabric.Rect({
      top: Number(obj.y), left: Number(obj.x), width: obj.width, height: obj.height, fill: color
    });
  },
  circle(obj, color) {
    return new fabric.Circle({
      top: Number(obj.y), left: Number(obj.x), radius: obj.width / 2, fill: color
    });
  },
};

export function phong(opt) {
  // let opt = Object.assign({}, preset, params);
  let phong = new THREE.MeshPhongMaterial({});
  phong.flatShading = Number(opt.flat_shading) > 0;
  if (opt.shininess) {
    phong.shininess = Number(opt.shininess) || 30;
  }
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
}

export function loadFabricImage(path, callback) {
  if (!path) callback(null);
  let object = null;
  fabric.util.loadImage(path, (img) => {
    object = new fabric.Image(img, {
      crossOrigin: "anonymous",
      hasRotatingPoint: false,
      transparentCorners: false,
    });
    callback && callback(object);
  }, null, {crossOrigin: 'anonymous'});
}

export class canvas {
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
}
