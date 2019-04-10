<template>
    <v3d-scene :width="width" :height="height" ref="scene">
        <v3d-camera-perspective :dis="2" :size="1" :width="500" :height="500">
            <v-orbit-controls :max="1000"></v-orbit-controls>
            <v3d-light-directional :helper="true"></v3d-light-directional>
        </v3d-camera-perspective>
        <v3d-geom-cylinder :material="Materials.ceramic()" :radialSegments="50"></v3d-geom-cylinder>
        <v3d-light-rect-area :helper="true" color="rgb(255,0,0)"></v3d-light-rect-area>
    </v3d-scene>
</template>

<script>
    import {
        V3dScene,
        V3dCameraPerspective,
        V3dGeomCylinder,
        V3dLightDirectional,
        V3dLightRectArea,
        Materials
    } from "_v3d"
    import VOrbitControls from "_v3d/packages/VOrbitControls/VOrbitControls";

    export default {
        name: "home",
        components: {
            VOrbitControls,
            V3dLightDirectional,
            V3dLightRectArea,
            V3dGeomCylinder,
            V3dScene,
            V3dCameraPerspective
        },
        data() {
            return {
                width: 500,
                height: 500,
                Materials
            }
        },
        methods: {
            debug(obj) {
                console.log(obj)
            }
        },
        mounted() {
            console.log(this.$refs.scene.scene)
        }
    }
</script>
