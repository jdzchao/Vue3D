<template>
    <div id="content">
        <!--        <three :width="width" :height="height"></three>-->
        <vue3d ref="scene" :width="width" :height="height" :config="{a:1}">
            <v3d-scene name="demo">
                <v3d-camera-perspective :width="width" :height="height" :helper="true">
                    <v3d-geom-cylinder :material="Bus.mtl_standard()" :radialSegments="50"
                                       :position="{x:0,y:0,z:0}" :scale="{x:0.5,y:0.5,z:.5}"></v3d-geom-cylinder>
                </v3d-camera-perspective>
                <v3d-light-rect-area :width="100" :height="100" :intensity="1"
                                     :target="{x:0,y:0,z:0}"  :position="{x:0,y:0,z:10}"></v3d-light-rect-area>
                <!--                <v3d-light-directional ></v3d-light-directional>-->
                <!--                <v3d-light-spot :visible-helper="true"></v3d-light-spot>-->

                <v3d-loader-obj path="/models/obj/Cerberus.obj"
                                :material="Bus.mtl_standard()"></v3d-loader-obj>
            </v3d-scene>
            <v3d-scene name="demo1">
                <v3d-camera-perspective :width="width" :height="height" :helper="true"></v3d-camera-perspective>
                <v3d-geom-cylinder :material="Bus.mtl_standard()" :radialSegments="50"
                                   :position="{x:-5,y:0,z:0}"></v3d-geom-cylinder>
                <v3d-loader-obj path="/models/obj/Cerberus.obj"
                                :material="Bus.mtl_standard()"></v3d-loader-obj>
            </v3d-scene>
        </vue3d>
    </div>
</template>

<script>
    import {
        Bus,
        Vue3d,
        V3dScene,
        V3dCameraPerspective,
        V3dGeomBox,
        V3dGeomCylinder,
        V3dLightAmbient,
        V3dLightDirectional,
        V3dLightRectArea,
        V3dLightSpot,
        V3dLoaderObj,
    } from "@v3d";

    export default {
        name: "SceneContent",
        components: {
            Vue3d,
            V3dScene,
            V3dCameraPerspective,
            V3dGeomBox,
            V3dGeomCylinder,
            V3dLightAmbient,
            V3dLightDirectional,
            V3dLightRectArea,
            V3dLightSpot,
            V3dLoaderObj,
        },
        data() {
            return {
                Bus,
                width: 0,
                height: 0,
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: {x: 1, y: 1, z: 1},
                skybox: {
                    path: '/skybox/'
                }
            }
        },
        methods: {
            onResize() {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
            },
        },
        mounted() {
            // Bus.setConf({debug: false})
            this.onResize();
            window.addEventListener("resize", this.onResize);
            setTimeout(() => {
                this.$refs.scene.scenes.focus(0)
                this.$refs.scene.render()
                setTimeout(() => {
                    this.$refs.scene.scenes.blur()
                }, 1500)
            }, 3000)
        }
    }
</script>

<style scoped>
    #content {
        width: 100%;
        height: calc(100% - 90px);
    }
</style>
