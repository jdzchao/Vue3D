<template>
    <v3d-scene :width="width" :height="height" ref="scene" :backgroundColor="'rgb(50,50,50)'">
        <!--        <v3d-light-ambient :intensity="0.2"></v3d-light-ambient>-->
        <v3d-camera-perspective ref="camera" :dis="2" :size="1" :x="0" :y="0" :width="500" :height="500"
                                @ready="setCamera">
            <v3d-light-rect-area :width="100" :height="100"
                                 :target="{x:15,y:0,z:0}" :position="{x:0,y:0,z:10}"></v3d-light-rect-area>
        </v3d-camera-perspective>

        <v3d-geom-cylinder :material="Materials.standard()" :radialSegments="50"></v3d-geom-cylinder>
        <!--        <v3d-light-rect-area :helper="false" color="rgb(255,0,0)"></v3d-light-rect-area>-->
        <v4h-orbit-controls :index="0" :max="1000"></v4h-orbit-controls>
        <v4h-sky-box path="/img/"
                     :texture="['scene_round.jpg','scene_round.jpg','scene_top_bottom.jpg','scene_top_bottom.jpg','scene_round.jpg','scene_round.jpg']"></v4h-sky-box>
    </v3d-scene>
</template>

<script>
    import {
        Bus,
        V3dScene,
        V3dCameraPerspective,
        V3dGeomCylinder,
        V3dLightDirectional,
        V3dLightRectArea,
        V3dLightSpot,
        V3dLightAmbient,
        V4hOrbitControls,
        Materials
    } from "_v3d"
    import V4hSkyBox from "_v3d/packages/V4hSkyBox/V4hSkyBox";

    export default {
        name: "home",
        components: {
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
