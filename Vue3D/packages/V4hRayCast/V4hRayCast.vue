<script>
    import *as THREE from "three"
    import ObjectHelper from "../../mixins/Helper"

    export default {
        name: "V4hRayCast",
        mixins: [ObjectHelper],
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
                raycaster: new THREE.Raycaster(),
                point: new THREE.Vector2(),
                target: [],
                charged: false,
                supportTouch: "ontouchend" in document
            }
        },
        created() {
            if (this.supportTouch) {
                this.root.dom.addEventListener('touchstart', this.charge, false);
            } else {
                this.root.dom.addEventListener('mousedown', this.charge, false);
            }
            if (this.near) {
                this.raycaster.near = this.near;
            }
            if (this.far && this.far > this.near) {
                this.raycaster.far = this.far;
            }
        },
        watch: {
            near(val) {
                this.raycaster.near = val;
            },
            far(val) {
                if (val > this.near) {
                    this.raycaster.far = val;
                }
            }
        },
        methods: {
            mouseCaster(event) {
                this.root.dom.removeEventListener('mousemove', this.leakage, false);
                this.root.dom.removeEventListener('mouseup', this.mouseCaster, false);
                if (!this.charged) return;
                this.point.x = (event.offsetX / this.root.dom.clientWidth) * 2 - 1;
                this.point.y = -(event.offsetY / this.root.dom.clientHeight) * 2 + 1;
                this.setCaster();
            },
            touchCaster(event) {
                this.root.dom.removeEventListener('touchmove', this.leakage, false);
                this.root.dom.removeEventListener('touchend', this.touchCaster, false);
                if (!this.charged) return;
                this.point.x = (event.changedTouches[0].clientX / this.root.dom.clientWidth) * 2 - 1;
                this.point.y = -(event.changedTouches[0].clientY / this.root.dom.clientHeight) * 2 + 1;
                this.setCaster();
            },
            setCaster() {
                this.raycaster.setFromCamera(this.point, this.camera);
                this.target = this.raycaster.intersectObjects(this.root.scene.children, true);
                this.$emit('cast', this.target);
                this.charged = false;
            },
            charge() {
                if (this.charged) return;
                this.charged = true;
                if (this.supportTouch) {
                    this.root.dom.addEventListener('touchmove', this.leakage, false);
                    this.root.dom.addEventListener('touchend', this.touchCaster, false);
                } else {
                    this.root.dom.addEventListener('mousemove', this.leakage, false);
                    this.root.dom.addEventListener('mouseup', this.mouseCaster, false);
                }
            },
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

