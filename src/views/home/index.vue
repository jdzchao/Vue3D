<template>
    <v3d-scene :width="width" :height="height" ref="scene">
        <v3d-light-ambient :intensity="0.2"></v3d-light-ambient>
        <v3d-camera-perspective :layer="2" ref="camera" :dis="2" :size="1" :x="0" :y="0" :width="300" :height="300"
                                :position="position">
        </v3d-camera-perspective>
        <v3d-camera-perspective ref="camera" :dis="2" :size="1" :x="250" :y="0" :width="300" :height="300" @ready="setCamera">
            <v-orbit-controls :max="1000"></v-orbit-controls>
            <v3d-light-rect-area :intensive="20" :helper="true" :width="500" :height="500"
                                 :target="{x:0,y:0,z:0}"></v3d-light-rect-area>
        </v3d-camera-perspective>

        <v3d-geom-cylinder :material="Materials.standard()" :radialSegments="50"></v3d-geom-cylinder>
        <!--        <v3d-light-rect-area :helper="false" color="rgb(255,0,0)"></v3d-light-rect-area>-->
    </v3d-scene>
</template>

<script>
    import {
        V3dScene,
        V3dCameraPerspective,
        V3dGeomCylinder,
        V3dLightDirectional,
        V3dLightRectArea,
        V3dLightSpot,
        V3dLightAmbient,
        VOrbitControls,
        Materials
    } from "_v3d"

    export default {
        name: "home",
        components: {
            V3dLightAmbient,
            VOrbitControls,
            V3dLightDirectional,
            V3dLightRectArea,
            V3dLightSpot,
            V3dGeomCylinder,
            V3dScene,
            V3dCameraPerspective
        },
        data() {
            return {
                width: 500,
                height: 500,
                Materials,
                position: {x: 0, y: 0, z: 50}
            }
        },
        methods: {
            debug(obj) {
                console.log(obj)
            },
            setCamera(camera) {
                camera.position.z = this.$refs.camera.dis + this.$refs.camera.size * 2;
            }
        },
        mounted() {
            console.log(this.$refs.scene.scene);
        }
    }
</script>
