<template>
    <div class="demo">
        <vue-3d ref="scene" :width="width" :height="height" :config="config" :plugins="plugins">
            <v3d-light-rect-area :width="100" :height="100" :intensity="1"
                                 :target="{x:5,y:0,z:0}" :position="{x:0,y:0,z:10}"></v3d-light-rect-area>
            <v3d-geom-cylinder :material="Materials.standard()" :radialSegments="50"></v3d-geom-cylinder>
        </vue-3d>
    </div>
</template>

<script>
    import {Materials, Config} from '@v3d'

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
                config: Config,
                plugins: {box: true, grid: true}
            }
        },
        methods: {
            resize() {
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
            },
        },
        mounted() {
            console.log(this.$refs.scene.V$scene, this.$refs.scene.scene);
            this.resize();
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
