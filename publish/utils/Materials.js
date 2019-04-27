import * as THREE from 'three'

export default {
    standard: function () {
        return new THREE.MeshStandardMaterial({
            color: "rgb(255,255,255)",
            roughness: 0,
            metalness: 0
        });
    },
};
