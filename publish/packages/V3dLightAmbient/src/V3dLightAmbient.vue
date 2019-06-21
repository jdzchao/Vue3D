<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot"></slot>
    </object>
</template>
<script>
    import * as THREE from "three"
    import Object3d_Light from "../../../mixins/Object3d_Light"

    export default {
        name: "V3dLightAmbient",
        mixins: [Object3d_Light],
        props: {},
        created() {
            this.light = new THREE.AmbientLight(this.color, this.intensity);
            this.light.position.set(5, 5, 0);
            this.helper = false;
        }
    }
</script>
