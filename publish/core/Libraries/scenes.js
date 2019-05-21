import Bus from "../../bus";

class ScenesManager {
    constructor(base_scene) {
        this.manager = [];
        this.activated = null; // activated scene

        this.base_scene = base_scene; // vue3d base scene

        this.default = Bus.scene_init('default'); // vue3d default sub-scene

        this.base_scene.add(this.default);

        return this;
    }

    /**
     * Get Active Scene
     * @returns {*|Scene|*}
     */
    active() {
        if (this.manager.length === 0) {
            return this.default
        } else {
            return this.manager[this.activated]
        }
    }

    /**
     * Add scene
     * @param name
     * @returns {*|Scene}
     */
    add(name) {
        let scene = Bus.scene_init(name);
        if (this.manager.length === 0) {
            this.base_scene.remove(this.default);
            this.base_scene.add(scene);
            this.activated = 1;
        }
        this.manager.push(scene);
        return scene;
    }

    /**
     * Change Active Scene
     * @param index
     */
    change(index) {
        if (index < 0 || index >= this.manager.length) return;
        this.base_scene.remove(this.manager[this.activated]);
        this.base_scene.add(this.manager[index]);
        this.activated = index;
    }

    /**
     * Get Scene by scene index
     * @param index
     * @returns {*}
     */
    getByIndex(index) {
        if (index <= this.manager.length)
            return this.manager[index];
    }

}

export default ScenesManager
