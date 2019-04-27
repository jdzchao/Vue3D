<template>
    <div class="demo">
        <vue3d ref="scene" :width="width" :height="height" :plugins="plugins">
            <v3d-scene id="demo">
                <v3d-light-rect-area :width="100" :height="100" :intensity="1"
                                     :target="{x:5,y:0,z:0}" :position="{x:0,y:0,z:10}"></v3d-light-rect-area>
                <!--                <v3d-geom-cylinder :material="Materials.standard()" :radialSegments="50"></v3d-geom-cylinder>-->
                <v3d-loader-obj path="/models/obj/Cerberus.obj"
                                :material="Materials.standard()"></v3d-loader-obj>
            </v3d-scene>
        </vue3d>
    </div>
</template>

<script>
    import {Materials} from '@v3d'

    export default {
        name: "DemoDev",
        data() {
            return {
                width: 100,
                height: 100,
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: {x: 1, y: 1, z: 1},
                Materials,
                plugins: {box: true, grid: true},
                skybox: {
                    path: '/skybox/'
                }
            }
        },
        methods: {
            resize() {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
            },
        },
        mounted() {
            this.resize();
            console.log(this.$refs.scene.$data.$_scene);
            window.addEventListener("resize", this.resize);
        }
    }
</script>

<style scoped>
    .demo {
        width: 100%;
        height: 100%;
    }
</style>
