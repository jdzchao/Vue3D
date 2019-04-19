import *as THREE from "three"
import Plugin from "./index"

export default {
    name: "RayCast",
    mixins: [Plugin],
    props: {
        near: {type: Number, default: 0},
        far: {type: Number, default: 1000},
    },
    data() {
        return {
            caster: new THREE.Raycaster(),
            point: new THREE.Vector2(),
            charged: false,
            supportTouch: "ontouchend" in document
        }
    },
    created() {
        if (this.supportTouch) {
            this.V$dom.addEventListener('touchstart', this.charge, false);
        } else {
            this.V$dom.addEventListener('mousedown', this.charge, false);
        }
        if (this.near) {
            this.caster.near = this.near;
        }
        if (this.far && this.far > this.near) {
            this.caster.far = this.far;
        }
    },
    watch: {
        near(val) {
            this.caster.near = val;
        },
        far(val) {
            if (val > this.near) {
                this.caster.far = val;
            }
        }
    },
    methods: {
        // 鼠标点击射线
        mouseCaster(event) {
            this.V$dom.removeEventListener('mousemove', this.leakage, false);
            this.V$dom.removeEventListener('mouseup', this.mouseCaster, false);
            if (!this.charged) return;
            this.point.x = (event.offsetX / this.V$dom.clientWidth) * 2 - 1;
            this.point.y = -(event.offsetY / this.V$dom.clientHeight) * 2 + 1;
            this.rayCaster();
        },
        // 触摸点击射线
        touchCaster(event) {
            this.V$dom.removeEventListener('touchmove', this.leakage, false);
            this.V$dom.removeEventListener('touchend', this.touchCaster, false);
            if (!this.charged) return;
            this.point.x = (event.changedTouches[0].clientX / this.V$dom.clientWidth) * 2 - 1;
            this.point.y = -(event.changedTouches[0].clientY / this.V$dom.clientHeight) * 2 + 1;
            this.rayCaster();
        },
        // 捕获射线
        rayCaster() {
            this.caster.setFromCamera(this.point, this.V$camera);
            let target = this.caster.intersectObjects(this.renderer.scenes_getScene().children, true);
            this.renderer.info("Vue3D cast: ", target);
            this.renderer.$emit('cast', target);
            this.charged = false;
        },
        // 射线充能 【兼容拖动事件】
        charge() {
            if (this.charged) return;
            this.charged = true;
            if (this.supportTouch) {
                this.V$dom.addEventListener('touchmove', this.leakage, false);
                this.V$dom.addEventListener('touchend', this.touchCaster, false);
            } else {
                this.V$dom.addEventListener('mousemove', this.leakage, false);
                this.V$dom.addEventListener('mouseup', this.mouseCaster, false);
            }
        },
        // 兼容拖动事件
        leakage(event) {
            if (event.type === "touchmove") {
                this.charged = false;
                return;
            }
            if (Math.abs(event.movementX) > 3 || Math.abs(event.movementY) > 3) {
                this.charged = false;
            }
        }
    }
}
