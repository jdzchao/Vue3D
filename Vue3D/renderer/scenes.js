import * as THREE from "three";

/**
 * 场景管理（Play mode）
 */
export default {
    data() {
        return {
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
            this.$data.$cameras = new THREE.ArrayCamera(this.$data.$cameras);

            // 默认激活的场景和像机
            this.scene = this.$data.$scene;
            this.cameras = this.$data.$cameras;
            // 添加到 Base Scene 中去
            this.$data._$scene.add(this.$data.$scene);
        },
        scenes_addCamera(camera) {
            this.$data.cameras.push(camera);
            this.refresh();
        }
    }
}
