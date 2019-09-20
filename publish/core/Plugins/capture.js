import *as THREE from "three"

class Capture {
    constructor(canvas, camera, scenes_manager, callback) {
        this._canvas = canvas;
        this._camera = camera;
        this._scenes = scenes_manager;

        this._all = []; // target all objects
        this._captured = null; // target object3d

        this._caster = new THREE.Raycaster();// ray caster
        this._point = new THREE.Vector2();// screen point
        this._charged = false; // charge status

        this._supportTouch = "ontouchend" in document;

        this.callback = typeof callback === "function" ? callback : () => {
            console.log(this.target);
        };

        this.init();
        return this;
    }

    get all() {
        return this._all;
    }

    get target() {
        return this._captured;
    }

    set target(obj) {
        if (this.target === obj) return;
        this._captured = obj;
        this.callback(obj, this);
    }

    // 初始化
    init() {
        if (this._supportTouch) {
            this._canvas.addEventListener('touchstart', () => {
                this._charge();
            }, false)
        } else {
            this._canvas.addEventListener('mousedown', () => {
                this._charge();
            }, false)
        }
    }

    setRay(near, far) {
        if (!near) near = 0;
        if (near) this._caster.near = near;
        if (far && far > near) this._caster.far = far;
        return this
    }

    // 射线充能
    _charge() {
        if (this._charged) return;
        this._charged = true;
        if (this._supportTouch) {

            this._canvas.addEventListener('touchmove', (e) => {
                this._leakage(e);
            }, false);

            this._canvas.addEventListener('touchend', (e) => {
                this._touchCaster(e);
            }, false);

        } else {

            this._canvas.addEventListener('mousemove', (e) => {
                this._leakage(e);
            }, false);

            this._canvas.addEventListener('mouseup', (e) => {
                this._mouseCaster(e);
            }, false);
        }
    }

    // 取消充能
    _leakage(event) {
        if (event.type === "touchmove") {
            this._charged = false;
            return
        }
        if (Math.abs(event.movementX) > 3 || Math.abs(event.movementY) > 3) {
            this._charged = false;
        }
    }

    // 鼠标点击发射射线
    _mouseCaster(event) {
        this._canvas.removeEventListener('mousemove', this._leakage, false);
        this._canvas.removeEventListener('mouseup', this._mouseCaster, false);
        if (!this._charged) return;
        this._point.x = (event.offsetX / this._canvas.clientWidth) * 2 - 1;
        this._point.y = -(event.offsetY / this._canvas.clientHeight) * 2 + 1;
        this._rayCaster();
    }

    // 触摸点击射线
    _touchCaster(event) {
        this._canvas.removeEventListener('touchmove', this._leakage, false);
        this._canvas.removeEventListener('touchend', this._touchCaster, false);
        if (!this._charged) return;
        this._point.x = (event.changedTouches[0].clientX / this._canvas.clientWidth) * 2 - 1;
        this._point.y = -(event.changedTouches[0].clientY / this._canvas.clientHeight) * 2 + 1;
        this._rayCaster();
    }

    // 捕获射线
    _rayCaster() {
        this._caster.setFromCamera(this._point, this._camera);
        let targets = this._caster.intersectObjects(this._scenes.scene.children, true);
        this._AnalysisTargets(targets);
        this._charged = false;
    }

    // 分析结果
    _AnalysisTargets(targets) {
        this._all = targets;
        let _tar = null;
        if (targets.length > 0) {
            for (let i = 0; i < targets.length; i++) {
                let target = targets[i];
                if (target.object.hasOwnProperty('vComponent')) {
                    _tar = target.object;
                    break
                } else if (target.object.parent.hasOwnProperty('vComponent')) {
                    _tar = target.object.parent;
                    break
                }
            }
        }
        this.target = _tar;
    }
}

export default Capture
