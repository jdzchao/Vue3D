const THREE = require('three');

const ThreeUtils = {};

ThreeUtils.getSize = function (object) {
  let box = new THREE.Box3();
  box.setFromObject(object);
  return box.getSize();
};

ThreeUtils.getCenter = function (object) {
  let box = new THREE.Box3();
  box.setFromObject(object);
  return box.getCenter();
};

ThreeUtils.setCenter = function (object) {
  let offset = ThreeUtils.getCenter(object).negate();
  object.translateX(offset.x);
  object.translateY(offset.y);
  object.translateZ(offset.z);
};

ThreeUtils.computeScale = function (size, variable) {
  let maxDis = size.length() / 2;
  let scale = variable / maxDis;
  return scale;
};
ThreeUtils.calcFov = function (d, wh, size) {


}

ThreeUtils.setMaterial = function (opt) {
  let textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin("anonymous");
  let material = new THREE.MeshPhongMaterial({
    shading: THREE.SmoothShading,
    shininess: 30,
    color: 0xffffff,
  });
  if (typeof (opt) === "object") {
    let mapTexture = new THREE.Texture(opt);
    material.map = mapTexture;
  }
  else {
    textureLoader.load(opt, function (texture) {
      material.map = texture;
    });
  }

  return material;

};
ThreeUtils.setMap = function (opt) {
  let textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin("anonymous");
  let map;
  if (typeof (opt) === "object") {
    let mapTexture = new THREE.Texture(opt);
    map = mapTexture;
  }
  else {
    textureLoader.load(opt, function (texture) {
      map = texture;
    });
  }

  return map;

};

export default ThreeUtils;
