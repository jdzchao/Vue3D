<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot"></slot>
    </object>
</template>

<script>
    import * as THREE from "three"
    import Object3d from "../../mixins/Object3d"

    export default {
        name: "V3dGeomBox",
        mixins: [Object3d],
        props: {
            x: {type: Number, default: 100},
            y: {type: Number, default: 100},
            z: {type: Number, default: 100},
        },
        created() {
            this.object3d = new THREE.BoxGeometry(this.x, this.y, this.z);
        }
    }
</script>
