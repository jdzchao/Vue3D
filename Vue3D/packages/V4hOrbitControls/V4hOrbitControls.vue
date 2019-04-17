<script>
    import THREE from "./OrbitControls"
    import Helper from "../../mixins/Helper"

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
                this.control = new THREE.OrbitControls(this.camera, this.dom);
                this.control.addEventListener('change', this.render, false);

                this.control.type = 'orbit';
                this.control.minDistance = this.min;
                this.control.maxDistance = this.max;
                this.control.enabled = this.enable;
                this.control.enableKeys = this.enableKeys;
                this.control.autoRotate = this.autoRotate;
                this.renderer.$on("update", this.control.update);
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
    }
</script>
