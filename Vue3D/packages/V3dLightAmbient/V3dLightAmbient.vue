<template></template>

<script>
    import * as THREE from "three"
    import Light from "../../mixins/Light"

    export default {
        name: "V3dLightAmbient",
        mixins: [Light],
        props: {},
        created() {
            this.light = new THREE.AmbientLight(this.color, this.intensity);
            this.light.position.set(5, 5, 0);
            this.helper = false;
        }
    }
</script>
