<template>
    <object type="material" :prepared="completed"></object>
</template>

<script>
    import {mapState} from 'vuex'
    import * as THREE from 'three'
    // import {imagePath} from "@/api/s3"
    import {canvas, loadFabricImage, phong} from './materials'

    export default {
        name: "c-material",
        props: {
            mtl: {type: Object}
        },
        data() {
            return {
                prepared: false, // 数据准备状态
                schedule: 0, // 数据加载状态
                material: {},
                canvas_color_data: {},
                canvas_normal_data: {},
                canvas_specular_data: {},
                bgColor: "rgba(255,255,255,1)",
                preset: {
                    name: '',
                    flat_shading: false,
                    shininess: 30,
                    specular: null,
                    color: null,
                    transparent: false,
                    opacity: 1,
                    map_color: null,
                    map_normal: null,
                    map_specular: null
                }
            }
        },
        mounted() {
            this.setMaterial(this.mtl);
        },
        computed: {
            ...mapState({
                materials: state => state.sceneEditor._materials,
                editableMaterialMap: state => state.sceneEditor.setting.editableMaterialMap,
                editableMaterialNormalMap: state => state.sceneEditor.setting.editableMaterialNormalMap,
                editableMaterialSpecularMap: state => state.sceneEditor.setting.editableMaterialSpecularMap,
            }),
            completed() {
                if (this.prepared && this.schedule === 0) {
                    this.done();
                }
            }
        },
        methods: {
            setMaterial(item) {
                this.prepared = false;
                if (item.type === 'phong') {
                    this.preset = Object.assign(this.preset, item);
                    this.material = phong(this.preset);
                    this.mapColor(this.preset.map_color);
                    this.mapNormal(this.preset.map_normal);
                    this.mapSpecular(this.preset.map_specular);
                }
                this.prepared = true;
            },
            mapColor(val) {
                this.schedule++;
                if (this.editableMaterialMap) {
                    loadFabricImage(imagePath(val), (res) => {
                        this.canvas_color_data = new canvas(this.bgColor, res);
                        this.material.map = new THREE.Texture(this.canvas_color_data.dom);
                        this.material.map.name = val;
                        this.material.map.needsUpdate = true;
                        this.schedule--;
                    })
                } else {
                    new THREE.TextureLoader().load(imagePath(val), (res) => {
                        this.material.map = res;
                        this.material.map.name = val;
                        this.material.map.needsUpdate = true;
                        this.schedule--;
                    }, null, (err) => {
                        this.schedule--;
                    });
                }
            },
            mapNormal(val) {
                this.schedule++;
                if (this.editableMaterialNormalMap) {
                    // TODO: 编辑法线图，实现可雕刻定制
                } else {
                    new THREE.TextureLoader().load(imagePath(val), (res) => {
                        res.name = val;
                        this.material.normalMap = res;
                        this.material.normalMap.needsUpdate = true;
                        this.schedule--;
                    }, null, (err) => {
                        this.schedule--;
                    });
                }
            },
            mapSpecular(val) {
                this.schedule++;
                if (this.editableMaterialSpecularMap) {
                    // TODO: 编辑法线图，实现可抛光定制
                } else {
                    new THREE.TextureLoader().load(imagePath(val), (res) => {
                        res.name = val;
                        this.material.specularMap = res;
                        this.material.specularMap.needsUpdate = true;
                        this.schedule--;
                    }, null, (err) => {
                        this.schedule--;
                    });
                }
            },
            done() {
                this.prepared = false;
                this.material.needsUpdate = true;

                this.$store.state.sceneEditor._materials[this.mtl.name] = {
                    data: this.preset,
                    mtl: this.material,
                };

                let n = this.$store.state.sceneEditor.data.materials.indexOf(this.mtl);
                this.$store.state.sceneEditor.data.materials[n] = this.preset;
                if (this.canvas_color_data.hasOwnProperty('canvas')) {
                    this.$store.state.sceneEditor._materials[this.mtl.name].map_canvas = this.canvas_color_data;
                }

                this.$store.state.sceneEditor.progress.current++;
                this.$store.dispatch('SceneRender').then();
                this.$emit("loaded", this.material);
            },
        }
    }
</script>
