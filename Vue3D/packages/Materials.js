import * as THREE from 'three'

const loader = new THREE.TextureLoader();

let mtl = {
    ceramic: function () {
        return new THREE.MeshPhongMaterial({
            flatShading: false,
            shininess: 30,
            specular: 0xffffff,
            color: "rgb(255,255,255)",
        });
    },
    standard: function () {
        return new THREE.MeshStandardMaterial({color: 0xA00000, roughness: 0, metalness: 0});
    },
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
