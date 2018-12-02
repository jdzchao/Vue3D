<template>
    <div id="panel-scene">
        <v-scene ref="scene" :width="width" :height="height">
            <x-camera :width="width" :height="height" :far="2500">
                <x-light :type="'Directional'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
            </x-camera>
            <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>

            <w-ray-cast @cast="ray" :far="2500"></w-ray-cast>
            <w-orbit-controls :enable="orbit" :max="2000"></w-orbit-controls>
            <w-transform-controls :size="0.1" :mode="transform" :target="selectedObj"></w-transform-controls>
            <w-grid-helper></w-grid-helper>
            <w-box-helper :target="selectedObj"></w-box-helper>

            <!--<template v-if="loaded" v-for="item in objects">-->
                <!--<c-loader :obj="item"></c-loader>-->
            <!--</template>-->
            <!--<template v-if="loaded" v-for="item in materials">-->
                <!--<c-material :mtl="item"></c-material>-->
            <!--</template>-->
        </v-scene>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import {
        VScene,
        WBoxHelper,
        WGridHelper,
        WOrbitControls,
        WRayCast,
        WTransformControls,
        XBoxGeometry,
        XCamera,
        XLight
    } from '_v3d'
    // import CLoader from '../extend/CLoader'
    // import CMaterial from '../extend/CMaterial'

    export default {
        name: "PanelScene",
        components: {
            WBoxHelper,
            VScene,
            XLight,
            XCamera,
            WOrbitControls,
            WTransformControls,
            WGridHelper,
            WRayCast,
            XBoxGeometry,
            // CLoader,
            // CMaterial,
        },
        data() {
            return {
                width: 100,
                height: 100,
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: {x: 1, y: 1, z: 1},
            }
        },
        methods: {
            sceneResize() {
                this.width = this.$store.state.vue3d.sWidth = this.$el.clientWidth;
                this.height = this.$store.state.vue3d.sHeight = this.$el.clientHeight;
            },
            ray(targets) {
                this.$store.dispatch('GetSelectedByRay', targets).then(res => {
                });
            },
            render() {
                this.$store.dispatch('SceneRender').then();
            }
        },
        computed: {
            ...mapState({
                orbit: state => state.vue3d.setting.orbit,
                transform: state => state.vue3d.setting.transform,
                objects: state => state.vue3d.data.objects,
                materials: state => state.vue3d.data.materials,
                selectedObj: state => state.vue3d.selected.obj,
            }),
            ...mapGetters({
                loaded: 'sceneLoaded'
            }),
        },
        watch: {
            selectedObj(val, oldVal) {
                if (val && val !== oldVal) {
                    this.position = val.position;
                    this.rotation = val.rotation;
                    this.scale = val.scale;
                }
            },
            position: {
                deep: true,
                handler() {
                    if (!this.selectedObj) return;
                    this.render();
                }
            },
            rotation: {
                deep: true,
                handler() {
                    if (!this.selectedObj) return;
                    this.render();
                }
            },
            scale: {
                deep: true,
                handler() {
                    if (!this.selectedObj) return;
                    this.render();
                }
            },
        },
        mounted() {
            this.$store.state.vue3d.dom = this.$refs.scene;
            this.sceneResize();
            window.addEventListener("resize", this.sceneResize);
        },
    }
</script>

<style scoped>
    #panel-scene {
        width: 100%;
        height: 100%;
    }
</style>
