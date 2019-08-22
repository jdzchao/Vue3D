import Bus from "../../bus";

class ScenesManager {
    constructor(name) {
        this.manager = [];
        this.index = -1; // activated scene index

        this.base = Bus.scene_init(name); // vue3d base scene
        // this.base_scene.add(this.default);

        return this;
    }

    /**
     * Get Active Scene
     * @returns {*|Scene|*}
     */
    activated() {
        if (this.manager.length < 0 || this.index < 0) {
            return this.base_scene
        } else {
            return this.manager[this.index]
        }
    }

    /**
     * Add scene
     * @param name
     * @returns {*|Scene}
     */
    add(name) {
        let scene = Bus.scene_init(name);
        this.base_scene.add(scene);
        this.manager.push(scene);
        return scene;
    }

    /**
     * Change Active Scene
     * @param index
     */
    change(index) {
        if (index < 0 || index >= this.manager.length) return;
        this.base_scene.remove(this.manager[this.index]);
        this.base_scene.add(this.manager[index]);
        this.index = index;
    }

    /**
     * Get Scene by scene index
     * @param index
     * @returns {*}
     */
    getByIndex(index) {
        if (index >= 0 && index < this.manager.length)
            return this.manager[index];
    }

}

export default ScenesManager
