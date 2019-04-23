<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot"></slot>
    </object>
</template>

<script>
    import * as THREE from "three"
    import Object3d_Light from "../../mixins/Object3d_Light"

    export default {
        name: "V3dLightSpot",
        mixins: [Object3d_Light],
        props: {
            distance: {type: Number, default: 0},
            angle: {type: Number, default: Math.PI},
            penumbra: {type: Number, default: 0},
            decay: {type: Number, default: 1},
        },
        created() {
            this.light = new THREE.SpotLight(this.color, this.intensity, this.distance, this.angle, this.penumbra, this.decay);
            if (this.helper) {
                this.lightHelper = new THREE.SpotLightHelper(this.light);
            }
        },
    }
</script>
