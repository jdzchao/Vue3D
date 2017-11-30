import * as THREE from 'three'

const version = "1.0";

class Vue3d {
  constructor() {
    this.version = version;
    this.size = 100;
    this.aspect = 1;
    this.dom = null; // webGL canvas dom
    this.renderer = null; // 渲染器
    this.scene = null; // 当前场景
    this.camera = null; // 主摄像机
    this.group = null; // 三维对象组
    this.target = null; // 当前选中的三维对象
    this.ray = null; // 射线
    this.tick = null; // 渲染辅助标记
    this.rendererDelegation = []; // 渲染过程委托
  }

  rendererDelegationReg(func) {
    if (typeof func === 'function') {
      this.rendererDelegation.push(func);
    } else {
      console.debug('Error Delegation Function');
    }
  };

  render() {
    if (this.rendererDelegation.length < 1) return;
    if (this.tick) return;
    this.tick = requestAnimationFrame(() => {
      this.tick = null;
      this.rendererDelegation.forEach((func) => {
        func();
      });
      this.renderer.render(this.scene, this.camera);
    })
  };

  getObjectSize(object) {
    let box = new THREE.Box3();
    box.setFromObject(object);
    return box.getSize();
  }

  placeZeroPoint(object) {
    let box = new THREE.Box3();
    box.setFromObject(object);
    let center = box.getCenter();
    object.position.x -= center.x;
    object.position.y -= center.y;
    object.position.z -= center.z;
    return center;
  }

  adaptScale(object) {
    let scale = 1;
    let scene_size = this.size;
    let size = this.getObjectSize(object);
    if (size.x / size.y > this.aspect) {
      scale *= scene_size / size.x;
      size.multiplyScalar(scale);
    } else {
      scale *= this.aspect > 1 ? scene_size / size.y : scene_size / size.y / this.aspect;
      size.multiplyScalar(scale);
    }
    if (size.z > scene_size) {
      scale *= scene_size / size.z;
      size.multiplyScalar(scale);
    }
    object.scale.set(scale, scale, scale);
    return scale;
  }
}

export default new Vue3d;
