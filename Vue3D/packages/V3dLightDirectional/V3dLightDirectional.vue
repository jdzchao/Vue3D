<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot"></slot>
    </object>
</template>

<script>
    import * as THREE from "three"
    import Light from "../../mixins/Light"

    export default {
        name: "V3dLightDirectional",
        mixins: [Light],
        created() {
            this.light = new THREE.DirectionalLight(this.color, this.intensity);
            if (this.helper) {
                this.lightHelper = new THREE.DirectionalLightHelper(this.light);
            }
        },
    }
</script>

