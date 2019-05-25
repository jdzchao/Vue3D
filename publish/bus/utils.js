import * as THREE from 'three'

/**
 * 工具
 */
export default {
    methods: {
        scene_init(name) {
            let scene = new THREE.Scene();
            scene.name = name ? name : scene.uuid;
            scene.cameras = [];
            scene.arrayCamera = new THREE.ArrayCamera(scene.cameras);
            return scene;
        }
    }
}
