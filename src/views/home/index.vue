<template>
    <v3d-scene :width="width" :height="height">
        <v3d-perspective-camera></v3d-perspective-camera>
        <v3d-geom-box></v3d-geom-box>
    </v3d-scene>
</template>

<script>
    import {
        V3dScene,
        V3dPerspectiveCamera
    } from "_v3d"
    import V3dGeomBox from "_v3d/packages/V3dGeomBox/V3dGeomBox";

    export default {
        name: "home",
        components: {V3dGeomBox, V3dScene, V3dPerspectiveCamera},
        data() {
            return {
                width: 500,
                height: 500
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
