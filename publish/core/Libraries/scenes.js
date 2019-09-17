import Bus from "../../bus";

class ScenesManager {
    constructor(name) {
        this._base = Bus.init_scene(name); // vue3d base scene

        this._subs = []; // sub-scene array
        this._index = -1; // activate sub-scene index
        this._focused = false; // is focused status

        return this;
    }

    // all sub scenes
    get all() {
        return this._subs;
    }

    // base scene
    get base() {
        return this._base;
    }

    // active scene
    get scene() {
        return this.getActive();
    }

    // active arrayCamera
    get cameras() {
        let scene = this.getActive();
        if (scene && scene.hasOwnProperty('arrayCamera')) {
            return scene.arrayCamera;
        }
        console.error('Error Scene: ' + this._index);
        return null;
    }

    /**
     * Add scene
     * @param scene
     * @returns {*|Scene}
     */
    add(scene) {
        if (typeof scene === 'object' && scene.type === "Scene") {
            this._subs.push(scene);
        } else if (typeof scene === "string") {
            scene = Bus.init_scene(scene);
            this._subs.push(scene);
        } else {
            return false;
        }
        if (!this._focused) {
            this.base.add(scene);
        }
        return scene;
    }

    /**
     * Remove scene
     * @param scene
     */
    remove(scene) {
        let index = this._index;
        if (typeof scene === 'object' && scene.type === "Scene") {
            index = this._subs.indexOf(scene);
        } else if (typeof scene === "string") {
            index = this._subs.findIndex(item => item.name === scene);
        } else if (typeof scene === "number") {
            index = scene;
        }
        if (!this._focused) {
            this.base.remove(this._subs[scene]);
        }
        this._subs.splice(index, 1);
    }

    /**
     * base scene in focus on sub-scene
     * @param index
     */
    focus(index) {
        if (this._focused) return;
        if (this._subs.length > index && index >= 0) {
            this._index = index;
        }
        if (this._index < 0) return;
        this._unmountAll();
        this._base.add(this._subs[this._index]);
        this._focused = true;
    }

    /**
     * base scene blur all sub-scenes
     */
    blur() {
        if (!this._focused) return;
        // this._base.remove(this._subs[this._index]);
        this._mountAll();
        this._focused = false;
    }

    /**
     * Get Active Scene
     * @returns {*}
     */
    getActive() {
        if (this._subs.length > this._index && this._index >= 0) {
            return this._subs[this._index];
        } else {
            return this._base;
        }
    }

    /**
     * Set Active Scene
     * @param index
     */
    setActive(index) {
        if (this._subs.length > index && index >= 0) {
            this._index = index;
        } else {
            this._index = -1;
        }
    }

    /**
     * Get Scene by scene index
     * @param index
     * @returns {*}
     */
    getSceneByIndex(index) {
        if (this._subs.length > index && index >= 0) {
            return this._subs[index];
        }
    }

    _mountAll() {
        this._subs.forEach(item => {
            this._base.add(item);
        })
    }

    _unmountAll() {
        this._subs.forEach(item => {
            this._base.remove(item);
        })
    }


}

export default ScenesManager
