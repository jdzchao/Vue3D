<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot"></slot>
    </object>
</template>

<script>
    import * as THREE from "three"
    import Object3d_Light from "../../../mixins/Object3d_Light"

    export default {
        name: "V3dLightDirectional",
        mixins: [Object3d_Light],
        created() {
            this.light = new THREE.DirectionalLight(this.color, this.intensity);
            if (this.helper) {
                this.lightHelper = new THREE.DirectionalLightHelper(this.light);
            }
        },
    }
</script>

