<script>
    import *as THREE from "three"
    import Helper from "../../mixins/Helper"

    export default {
        name: "V4hRayCast",
        mixins: [Helper],
        props: {
            near: {type: Number, default: 0},
            far: {type: Number, default: 1000},
            filter: {
                type: Array, default: () => {
                    return ["Mesh"]
                }
            }
        },
        data() {
            return {
                caster: new THREE.Raycaster(),
                point: new THREE.Vector2(),
                target: [],
                charged: false,
                supportTouch: "ontouchend" in document
            }
        },
        created() {
            if (this.supportTouch) {
                this.canvas.addEventListener('touchstart', this.charge, false);
            } else {
                this.canvas.addEventListener('mousedown', this.charge, false);
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
                this.canvas.removeEventListener('mousemove', this.leakage, false);
                this.canvas.removeEventListener('mouseup', this.mouseCaster, false);
                if (!this.charged) return;
                this.point.x = (event.offsetX / this.canvas.clientWidth) * 2 - 1;
                this.point.y = -(event.offsetY / this.canvas.clientHeight) * 2 + 1;
                this.rayCaster();
            },
            // 触摸点击射线
            touchCaster(event) {
                this.canvas.removeEventListener('touchmove', this.leakage, false);
                this.canvas.removeEventListener('touchend', this.touchCaster, false);
                if (!this.charged) return;
                this.point.x = (event.changedTouches[0].clientX / this.canvas.clientWidth) * 2 - 1;
                this.point.y = -(event.changedTouches[0].clientY / this.canvas.clientHeight) * 2 + 1;
                this.rayCaster();
            },
            // 捕获射线
            rayCaster() {
                this.caster.setFromCamera(this.point, this.camera);
                this.target = this.caster.intersectObjects(this.renderer.scene.children, true);
                this.$emit('cast', this.target);
                this.charged = false;
            },
            // 射线充能 【兼容拖动事件】
            charge() {
                if (this.charged) return;
                this.charged = true;
                if (this.supportTouch) {
                    this.canvas.addEventListener('touchmove', this.leakage, false);
                    this.canvas.addEventListener('touchend', this.touchCaster, false);
                } else {
                    this.canvas.addEventListener('mousemove', this.leakage, false);
                    this.canvas.addEventListener('mouseup', this.mouseCaster, false);
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
</script>

