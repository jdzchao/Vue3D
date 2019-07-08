import * as THREE from 'three'

export function mtl_standard() {
    return new THREE.MeshStandardMaterial({
        color: "rgb(255,255,255)",
        roughness: 0,
        metalness: 0
    });
}

export default {
    methods: {
        mtl_standard
    }
}
