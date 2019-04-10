<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot"></slot>
    </object>
</template>

<script>
    import THREE from "./RectAreaLightUniformsLib"
    import Light from "../../mixins/Light"

    export default {
        name: "V3dLightRectArea",
        mixins: [Light],
        props: {
            width: {type: Number, default: 10},
            height: {type: Number, default: 10},
        },
        methods: {
            setHelper() {
                this._helper = new THREE.RectAreaLightHelper(this.light);
                this.light.add(this._helper);
            }
        },
        created() {
            this.light = new THREE.RectAreaLight(this.color, this.intensity, this.width, this.height);
            this.light.lookAt(0, 0, 0)
        }
    }
</script>
