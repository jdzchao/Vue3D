const THREE = require('three');

const Three = {
  // 自动计算fov
  calcFov: function (dis, width, aspect) {
    let vertical = width;
    if (aspect < 1) {
      vertical = vertical / aspect;
    }
    return Math.atan(vertical / dis / 2) * (180 / Math.PI);
    // return Math.atan(vertical / dis / 2) * 2 * (180 / Math.PI);
  },
  // 自动计算模型尺寸
  getSize: function (object) {
    let box = new THREE.Box3();
    box.setFromObject(object);
    return box.getSize();
  },
  getCenter: function (object) {
    let box = new THREE.Box3();
    box.setFromObject(object);
    return box.getCenter();
  }
};


export default Three;
