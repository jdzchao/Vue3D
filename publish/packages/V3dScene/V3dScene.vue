<template>
    <object :name="$options.name" style="display:none;">
        <slot></slot>
    </object>
</template>
<script>
    import * as THREE from 'three'

    export default {
        name: "V3dScene",
        props: {
            id: {type: String, required: true}
        },
        data() {
            return {
                V$dom: null,
                V$scene: null,
                V$camera: [],
                renderer: null,
            }
        },
        created() {
            if (this.hasOwnProperty("$parent") && this.$parent.hasOwnProperty('V$scene')) {
                this.V$dom = this.$parent.V$dom;
                this.V$scene = this.$parent.V$scene;
                this.V$camera = this.$parent.V$camera;
                this.renderer = this.$parent.renderer;
                this.$parent.scene = new THREE.Scene();
                this.$parent.cameras = [];
            } else {
                console.error(this.$options.name + " should slot in Vue3D Component");
                return;
            }
        }
    }
</script>

