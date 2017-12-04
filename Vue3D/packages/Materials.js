import * as THREE from 'three'

const loader = new THREE.TextureLoader();

let mtl = {
  glass: function () {
    return new THREE.MeshPhongMaterial({
      flatShading: false,
      shininess: 90,
      specular: 0xffffff,
      color: "rgb(192,200,200)",
      transparent: true,
      opacity: 0.3
    });
  },
  metal: function () {
    return new THREE.MeshPhongMaterial({
      flatShading: false,
      shininess: 90,
      specular: 0xffffff,
      color: "rgb(220,220,220)",
      transparent: false,
      normalMap: loader.load('http://s3.cifuwu.com/image/show/origin/6a17533c94438abe7d7f685849af0a121c7df0cc.jpg')
    });
  },
  sapphire: function () {
    return new THREE.MeshPhongMaterial({
      flatShading: false,
      shininess: 100,
      color: "rgb(0,47,167)",
      transparent: true,
      opacity: 0.5
    });
  }
};
export default mtl;
