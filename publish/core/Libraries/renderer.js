import * as THREE from "three";
import Bus from "../../bus";

class Renderer {
    constructor(canvas, params) {
        this.renderer = new THREE.WebGLRenderer({canvas, ...params});
        this._rendering = null; // render handler
        this._pause = false; // pause renderer status
        this._auto = false; // auto renderer status
        this._scene = null; // Base Scene
        this._camera = null; // Base Camera
        this.width = 500;
        this.height = 500;
        this.ratio = 1;
        this.clearColor = 'rgb(25,25,25)'; // renderer clear color
        this.clearAlpha = 1; // renderer clear alpha

        this.setClearColor(this.clearColor, this.clearAlpha);

        return this;
    }

    /**
     * 渲染一帧
     * @param callback
     */
    render(callback) {
        if (this._rendering || this._pause) return;
        this._rendering = requestAnimationFrame(() => {
            Bus.delegationCall(this); // 调用委托中的方法

            callback && callback()

            this.renderer.render(this._scene, this._camera);
            this._rendering = null; // 当前帧渲染完成，释放

            if (this._auto) {
                this.render();
            }
        })
    }

    /**
     * Set Active scene & camera
     * @param scene
     * @param camera
     */
    setActive(scene, camera) {
        this._scene = scene;
        this._camera = camera;
        return this;
    }

    /**
     * Set size
     * @param width
     * @param height
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.renderer.setSize(width, height);
        return this;
    }

    /**
     * Set ratio
     * @param ratio
     */
    setPixelRatio(ratio) {
        this.ratio = ratio;
        this.renderer.setPixelRatio(ratio);
        return this;
    }

    /**
     * Set clear color
     * @param clearColor
     * @param clearAlpha
     */
    setClearColor(clearColor, clearAlpha) {
        this.clearColor = clearColor;
        this.clearAlpha = clearAlpha;
        this.renderer.setClearColor(new THREE.Color(clearColor).getHex(), clearAlpha);
        return this;
    }

    setAspect() {
        this._camera.aspect = this.width / this.height;
        this._camera.updateProjectionMatrix();// 摄像机参数改变后必须执行生效
        return this;
    }

    /**
     * Get pause status
     * @returns {boolean}
     */
    getPause() {
        return this._pause;
    }

    /**
     * Switch set pause status
     */
    setPause() {
        this._pause = !this._pause;
        Bus.info("ლ(´ڡ`ლ) Vue3D Auto => " + this._pause);
        return this;
    }

    /**
     * Get auto status
     * @returns {boolean}
     */
    getAuto() {
        return this._auto;
    }

    /**
     * Switch set auto status
     */
    setAuto() {
        this._auto = !this._auto;
        Bus.info("ლ(´ڡ`ლ) Vue3D Auto => " + this._auto);
        return this;
    }

}

export default Renderer
