<template></template>
<script>
    import THREE from "./OrbitControls"
    import ObjectHelper from "../../mixins/ObjectHelper"

    export default {
        name: "VOrbitControls",
        mixins: [ObjectHelper],
        props: {
            min: {type: Number, default: 10},
            max: {type: Number, default: 500},
            enable: {type: Boolean, default: true},
            enableKeys: {type: Boolean, default: false},
            autoRotate: {type: Boolean, default: false},
        },
        data() {
            return {
                keyPoint: 'camera',
                control: null
            }
        },
        mounted() {
            if (this.active) {
                this.control = new THREE.OrbitControls(this.$parent.camera, this.root.dom);
                this.control.addEventListener('change', this.root.render, false);
                this.control.type = 'orbit';
                this.control.minDistance = this.min;
                this.control.maxDistance = this.max;
                this.control.enabled = this.enable;
                this.control.enableKeys = this.enableKeys;
                this.control.autoRotate = this.autoRotate;
                this.root.rendererDelegationAdd(this.updateControls);
            }
        },
        watch: {
            enable(val) {
                if (!this.active) return;
                this.control.enabled = this.enable;
            },
            enableKeys(val) {
                if (!this.active) return;
                this.control.enableKeys = this.enableKeys;
            },
            autoRotate(val) {
                if (!this.active) return;
                this.control.autoRotate = this.autoRotate;
            }
        },
        methods: {
            updateControls() {
                this.control.update();
            },
            render() {
                if (this.parent) {
                    this.parent.render()
                }
            }
        }
    }
</script>
