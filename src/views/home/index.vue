<template>
    <v3d-scene :width="width" :height="height">
        <v3d-camera></v3d-camera>
    </v3d-scene>
</template>

<script>
    import {
        V3dScene,
        V3dCamera
    } from "_v3d"

    export default {
        name: "home",
        components: {V3dCamera, V3dScene},
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
