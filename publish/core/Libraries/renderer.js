import * as THREE from "three";
import Bus from "../../bus";

class Renderer {
    constructor(canvas, params) {
        this._renderer = new THREE.WebGLRenderer({canvas, ...params});
        this._rendering = null; // render handler

        this._scene = null; // Base Scene
        this._camera = null; // Base Camera

        this._pause = false; // pause renderer status
        this._auto = false; // auto renderer status

        this._width = 500;
        this._height = 500;
        this._ratio = 1;
        this._clearColor = 'rgb(25,25,25)'; // renderer clear color
        this._clearAlpha = 1; // renderer clear alpha

        this.setClearColor(this.clearColor, this.clearAlpha);

        return this;
    }

    get renderer() {
        return this._renderer;
    }

    get pause() {
        return this._pause;
    }

    set pause(val) {
        this._pause = val;
    }

    get auto() {
        return this._auto;
    }

    set auto(val) {
        this._auto = val;
    }

    get width() {
        return this._width;
    }

    set width(val) {
        this._width = val;
        this._renderer.setSize(this._width, this._height);
    }

    get height() {
        return this._height;
    }

    set height(val) {
        this._height = val;
        this._renderer.setSize(this._width, this._height);
    }

    get clearColor() {
        return this._clearColor;
    }

    set clearColor(val) {
        this._clearColor = val;
        this._renderer.setClearColor(new THREE.Color(this._clearColor).getHex(), this._clearAlpha);
    }

    get clearAlpha() {
        return this._clearAlpha;
    }

    set clearAlpha(val) {
        this._clearAlpha = val;
        this._renderer.setClearColor(new THREE.Color(this._clearColor).getHex(), this._clearAlpha);
    }

    get ratio() {
        return this._ratio;
    }

    set ratio(val) {
        this._ratio = val;
        this._renderer.setPixelRatio(this._ratio);
    }


    /**
     * 渲染一帧
     * @param callback
     */
    render(callback) {
        if (this._rendering || this._pause) return;
        this._rendering = requestAnimationFrame(() => {

            Bus.delegationCall(this); // 调用委托中的方法

            callback && callback();

            this.renderer.render(this._scene, this._camera);
            this._rendering = null; // 当前帧渲染完成，释放

            if (this._auto) {
                this.render(callback);
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
        this._width = width;
        this._height = height;
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


}

export default Renderer
