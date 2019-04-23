import * as THREE from "three";

/**
 * 场景管理（Play mode）
 */
export default {
    data() {
        return {
            $scenes: [],

            $scene: null, // default scene
            $cameras: [], // default cameras
            $camIndex: 0, // default camera index

            scene: null, // activated Scene
            cameras: [], // activated Cameras
            camIndex: 0, // activated Camera index
        }
    },
    methods: {
        scenes_init() {
            this.$data.$scene = new THREE.Scene();
            let cameras = new THREE.ArrayCamera(this.$data.$cameras);
            // 默认激活的场景和像机
            this.scene = this.$data.$scene;
            this.cameras = cameras;
            // 添加到 Base Scene 中去
            this.$data._$scene.add(this.$data.$scene);
        },
        scenes_add(scene) {
            if (scene && scene.type !== "Scene") return;
            this.$data.$scenes.push(scene);
        },
        scenes_addCamera(camera) {
            this.$data.cameras.push(camera);
            this.refresh();
        },
        scenes_getScene() {
            return this.$data.$scene;
        },
        scenes_getCamera() {
            return this.$data.cameras[this.$data.$camIndex];
        },
        scenes_setSkyBox(path, texture) {

        }
    }
}
