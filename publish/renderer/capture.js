import *as THREE from "three"

/**
 * 对象捕获器
 */
export default {
    data() {
        return {
            captured: null, // captured object3d
            /// Ray Capture
            _$caster: null, // ray caster
            _$point: null, // screen point
            _$charged: false, // ray hack
            _$supportTouch: "ontouchend" in document // is support touch
        }
    },
    methods: {
        capture_init() {
            this.$data._$caster = new THREE.Raycaster();
            this.$data._$point = new THREE.Vector2();
            if (this.$data._$supportTouch) {
                this.$data._$canvas.addEventListener('touchstart', this._charge, false);
            } else {
                this.$data._$canvas.addEventListener('mousedown', this._charge, false);
            }
        },
        capture_set(obj) {
            this.captured = obj;
            this.render();
        },
        capture_get() {
            return this.captured
        },
        // 设置ray的远近
        capture_setRay(near, far) {
            if (!near) near = 0;
            if (near) this.$data._$caster.near = near;
            if (far && far > near) this.$data._$caster.far = this.far;
            this.render();
        },
        // 鼠标点击射线
        _mouseCaster(event) {
            this.$data._$canvas.removeEventListener('mousemove', this._leakage, false);
            this.$data._$canvas.removeEventListener('mouseup', this._mouseCaster, false);
            if (!this.$data._$charged) return;
            this.$data._$point.x = (event.offsetX / this.$data._$canvas.clientWidth) * 2 - 1;
            this.$data._$point.y = -(event.offsetY / this.$data._$canvas.clientHeight) * 2 + 1;
            this._rayCaster();
        },
        // 触摸点击射线
        _touchCaster(event) {
            this.$data._$canvas.removeEventListener('touchmove', this._leakage, false);
            this.$data._$canvas.removeEventListener('touchend', this._touchCaster, false);
            if (!this.$data._$charged) return;
            this.$data._$point.x = (event.changedTouches[0].clientX / this.$data._$canvas.clientWidth) * 2 - 1;
            this.$data._$point.y = -(event.changedTouches[0].clientY / this.$data._$canvas.clientHeight) * 2 + 1;
            this._rayCaster();
        },
        // 捕获射线
        _rayCaster() {
            this.$data._$caster.setFromCamera(this.$data._$point, this.$data._$camera);
            let targets = this.$data._$caster.intersectObjects(this.scenes_getScene().children, true);
            this._AnalysisTargets(targets);
            this.$data._$charged = false;
        },
        // 射线充能 【兼容拖动事件】
        _charge() {
            if (this.$data._$charged) return;
            this.$data._$charged = true;
            if (this.$data._$supportTouch) {
                this.$data._$canvas.addEventListener('touchmove', this._leakage, false);
                this.$data._$canvas.addEventListener('touchend', this._touchCaster, false);
            } else {
                this.$data._$canvas.addEventListener('mousemove', this._leakage, false);
                this.$data._$canvas.addEventListener('mouseup', this._mouseCaster, false);
            }
        },
        // 兼容拖动事件
        _leakage(event) {
            if (event.type === "touchmove") {
                this.$data._$charged = false;
                return;
            }
            if (Math.abs(event.movementX) > 3 || Math.abs(event.movementY) > 3) {
                this.$data._$charged = false;
            }
        },
        // 分析结果
        _AnalysisTargets(targets) {
            this.emit('raycast', targets);
            if (targets.length > 0) {
                targets.forEach((target) => {
                    if (target.object.type) {
                        this.captured = target.object;
                        this.emit('capture', target);
                        return;
                    }
                    this.emit('capture', null);
                });
            } else {
                this.emit('capture', null);
            }
        }
    }
}
