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
        methods: {
            setHelper() {
                this.object3d = this.light;
                this._helper = new THREE.DirectionalLightHelper(this.light, 5, this.color);
                this.root.scene.add(this._helper);
            }
        },
        created() {
            this.light = new THREE.DirectionalLight(this.color, this.intensity);
        }
    }
</script>

