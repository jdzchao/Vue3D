const THREE = require('three');

let Vue3D = {
  getObjectSize(object) {
    let box = new THREE.Box3();
    box.setFromObject(object);
    return box.getSize();
  },
  placeZeroPoint(object) {
    let box = new THREE.Box3();
    box.setFromObject(object);
    let center = box.getCenter();
    object.position.x -= center.x;
    object.position.y -= center.y;
    object.position.z -= center.z;
    return center;
  },
  adaptScale(object, aspect, vize) {
    let scale = 1;
    vize = vize ? vize : 100;
    console.log(vize);
    let box = new THREE.Box3();
    box.setFromObject(object);
    let size = box.getSize();
    if (size.x / size.y > aspect) {
      scale *= vize / size.x;
      size.multiplyScalar(scale);
    } else {
      scale *= aspect > 1 ? vize / size.y : vize / size.y / aspect;
      size.multiplyScalar(scale);
    }
    if (size.z > vize) {
      scale *= vize / size.z;
      size.multiplyScalar(scale);
    }
    object.scale.set(scale, scale, scale);
    return scale;
  }
};
export default Vue3D;
