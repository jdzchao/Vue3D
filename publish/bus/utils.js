import * as THREE from 'three'

export function scene_init(name) {
    let scene = new THREE.Scene();
    scene.name = name ? name : scene.uuid;
    scene.cameras = [];
    scene.arrayCamera = new THREE.ArrayCamera(scene.cameras);
    return scene;
}

export function get_object_size(object) {
    let box = new THREE.Box3();
    box.setFromObject(object);
    return box.getSize(object);
}

export default {
    methods: {
        scene_init,
        get_object_size
    }
}

