<script>
    import THREE from "./OrbitControls"
    import Helper from "../../mixins/Helper"
    import {Vue3d} from "../../index";

    export default {
        name: "V4hOrbitControls",
        mixins: [Helper],
        props: {
            min: {type: Number, default: 10},
            max: {type: Number, default: 500},
            enable: {type: Boolean, default: true},
            enableKeys: {type: Boolean, default: false},
            autoRotate: {type: Boolean, default: false},
        },
        data() {
            return {
                control: null
            }
        },
        mounted() {
            if (this.active) {
                console.log(this.camera, "debug");
                this.control = new THREE.OrbitControls(this.camera, this.V$dom);

                this.control.addEventListener('change', this.root.render, false);

                this.control.type = 'orbit';
                this.control.minDistance = this.min;
                this.control.maxDistance = this.max;
                this.control.enabled = this.enable;
                this.control.enableKeys = this.enableKeys;
                this.control.autoRotate = this.autoRotate;
                Vue3d.$on("render", this.updateControls);
            }
        },
        watch: {
            enable() {
                if (!this.active) return;
                this.control.enabled = this.enable;
            },
            enableKeys() {
                if (!this.active) return;
                this.control.enableKeys = this.enableKeys;
            },
            autoRotate() {
                if (!this.active) return;
                this.control.autoRotate = this.autoRotate;
            }
        },
        methods: {
            updateControls() {
                this.control.update();
            },
            render() {
                if (this.root) {
                    this.root.render()
                }
            }
        }
    }
</script>
