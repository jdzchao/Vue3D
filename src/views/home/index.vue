<template>
    <v3d-scene ref="scene" :width="width" :height="height" :backgroundColor="'rgb(50,50,50)'">
        <template slot="hierarchy">
            <v3d-light-ambient :intensity="0.2"></v3d-light-ambient>
            <v3d-camera-perspective ref="camera" :dis="10" :size="1" :x="0" :y="0" :width="500" :height="500"
                                    @ready="setCamera">

            </v3d-camera-perspective>
            <v3d-light-rect-area :width="100" :height="100" :intensity="1"
                                 :target="{x:5,y:0,z:0}" :position="{x:0,y:0,z:10}"></v3d-light-rect-area>
            <v3d-geom-cylinder :material="Materials.standard()" :radialSegments="50"></v3d-geom-cylinder>
        </template>
        <v4h-orbit-controls slot="v4h" :index="0" :max="1000"></v4h-orbit-controls>
        <!--        <v4h-ray-cast slot="v4h" @cast="cast"></v4h-ray-cast>-->
        <v4h-grid slot="v4h"></v4h-grid>
    </v3d-scene>
</template>

<script>
    import {
        Vue3d,
        V3dScene,
        V3dCameraPerspective,
        V3dGeomCylinder,
        V3dLightDirectional,
        V3dLightRectArea,
        V3dLightSpot,
        V3dLightAmbient,
        V4hGrid,
        V4hOrbitControls,
        V4hRayCast,
        V4hSkyBox,
        Materials
    } from "_v3d"

    export default {
        name: "home",
        components: {
            V4hGrid,
            V4hRayCast,
            V4hSkyBox,
            V3dLightAmbient,
            V4hOrbitControls,
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
                position: {x: 0, y: 0, z: 100}
            }
        },
        methods: {
            debug(obj) {
                console.log(obj)
            },
            setCamera(camera) {
                camera.position.z = this.$refs.camera.dis + this.$refs.camera.size * 3;
            },
            cast(obj) {
                console.log(obj)
            }
        },
        mounted() {
            console.log(this.$refs.scene.V$scene, this.$refs.scene.scene);
            setTimeout(() => {
                Vue3d.pure = !Vue3d.pure;
                Vue3d.$emit("render");
                console.log("render");
            }, 5000)
        }
    }
</script>
