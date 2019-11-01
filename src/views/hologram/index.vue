<template>
    <div id="hologram">
        <div class="canvas">
            <vue3d ref="scene" :width="width" :height="height">
                <v3d-scene name="demo" @open="opened">
                    <!-- 左 -->
                    <v3d-camera-perspective
                            :width="width/2"
                            :height="width/2"
                            :x="0"
                            :y="0"
                            :position="{x:-distance,y:0,z:0}"
                            :rotation="{x:0,y:-90,z:45}"
                    >
                        <v3d-light-directional
                                :intensity="intensity"
                                :target="{x:0,y:0,z:0}"
                                :position="{x:0,y:0,z:0}"
                                :rotation="{x:0,y:0,z:0}">
                        </v3d-light-directional>
                    </v3d-camera-perspective>
                    <!-- 下 -->
                    <v3d-camera-perspective
                            :width="width/2"
                            :height="width/2"
                            :x="width/2"
                            :y="0"
                            :position="{x:0,y:0,z:-distance}"
                            :rotation="{x:0,y:-180,z:-45}"
                    >
                        <v3d-light-directional
                                :intensity="intensity"
                                :target="{x:0,y:0,z:0}"
                                :position="{x:0,y:0,z:0}"
                                :rotation="{x:0,y:0,z:0}">
                        </v3d-light-directional>
                    </v3d-camera-perspective>
                    <!-- 上 -->
                    <v3d-camera-perspective
                            :width="width/2"
                            :height="width/2"
                            :x="0"
                            :y="width/2"
                            :position="{x:0,y:0,z:distance}"
                            :rotation="{x:0,y:0,z:-225}"
                    >
                        <v3d-light-directional
                                :intensity="intensity"
                                :target="{x:0,y:0,z:0}"
                                :position="{x:0,y:0,z:0}"
                                :rotation="{x:0,y:0,z:0}">
                        </v3d-light-directional>
                    </v3d-camera-perspective>
                    <!-- 右 -->
                    <v3d-camera-perspective
                            :width="width/2"
                            :height="width/2"
                            :x="width/2"
                            :y="width/2"
                            :position="{x:distance,y:0,z:0}"
                            :rotation="{x:0,y:90,z:225}"
                    >
                        <v3d-light-directional
                                :intensity="intensity"
                                :target="{x:0,y:0,z:0}"
                                :position="{x:0,y:0,z:0}"
                                :rotation="{x:0,y:0,z:0}">
                        </v3d-light-directional>

                    </v3d-camera-perspective>
                    <v3d-loader-obj
                            path="/models/cpu/b.obj"
                            :material="Bus.mtl_standard()"
                            :position="{x:0,y:-0.7,z:0}"
                            :scale="{x:0.01,y:0.01,z:0.01}"
                            :rotation="rotation"
                    >
                    </v3d-loader-obj>
                </v3d-scene>
            </vue3d>
        </div>
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
    import Orbit from "@v3d/core/Libraries/orbit";

    export default {
        name: "hologram",
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
                width: 768,
                height: 768,
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 110, z: 0},
                scale: {x: 1, y: 1, z: 1},
                distance: 2,
                intensity: 0.8,
                orbit: null
            }
        },
        methods: {
            opened() {
                this.$refs.scene.scenes.setActive(0)
                this.$refs.scene.renderer.clearColor = 'rgb(0,0,0)'
                this.$refs.scene.renderer.setActive(this.$refs.scene.scenes.scene, this.$refs.scene.scenes.cameras)
                this.$refs.scene.renderer.auto = true;
                setInterval(() => {
                    this.rotation.y++
                    this.rotation = Object.assign({}, this.rotation)
                    console.log(this.rotation.y)
                }, 50)
            }
        },
    }
</script>

<style scoped>
    #hologram {
        width: 100%;
        height: 100%;
        background-color: #000000;
    }

    .canvas {
        position: absolute;
        top: calc(50% - 384px);
        left: calc(50% - 384px);
        width: 768px;
        height: 768px;
        transform: rotate(45deg);
    }
</style>
