<template>
    <el-collapse-item name="materials">
        <template slot="title">
            <icon-font type="panel"></icon-font>
            <span style="margin: 0 0 0 5px">MATERIAL</span>
        </template>
        <div id="item-materials">
            <el-form label-width="80px">
                <el-form-item label="当前材质:">
                    <el-select value="" size="small" v-model="name" placeholder="请选择" :disabled="disabled"
                               style="width: 165px">
                        <template v-for="item,index in materials">
                            <el-option :key="item.data.name" :label="item.data.name"
                                       :value="item.data.name"></el-option>
                        </template>
                    </el-select>
                    <el-button size="small" @click="createMaterial">新建</el-button>
                </el-form-item>
            </el-form>

            <el-form label-width="80px" v-if="!disabled">

                <!--<el-form-item label="flatShading">-->
                <!--<el-switch v-model="mtl.flatShading"></el-switch>-->
                <!--</el-form-item>-->

                <el-form-item label="底色">
                    <el-col :span="6">
                        <el-form-item>
                            <el-color-picker color-format="rgb" :value="material.data.color"
                                             @input="changeColor"></el-color-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="反射光色">
                            <el-color-picker color-format="rgb" :value="material.data.specular"
                                             @input="changeSpecular"></el-color-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="光泽度">
                    <el-slider :value="Number(material.data.shininess)" @input="changeShininess" :min="0" :max="100"
                               :step="1"></el-slider>
                </el-form-item>

                <el-form-item label="透明">
                    <el-switch :value="Transparent(material.data.transparent)" @input="changeTransparent"></el-switch>
                </el-form-item>
                <el-form-item label="透明度">
                    <div class="block">
                        <el-slider :value="Number(material.data.opacity)" @input="changeOpacity" :min="0" :max="1"
                                   :step="0.01"></el-slider>
                    </div>
                </el-form-item>
                <el-form-item label="uv贴图">
                    <el-col :span="8">
                        <el-tooltip class="item" effect="dark" content="纹理图" placement="top">
                            <image-uploader :value="material.data.map_color" @input="changeMapColor" :width="60"
                                            :height="60"></image-uploader>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="8">
                        <el-tooltip class="item" effect="dark" content="法线图" placement="top">
                            <image-uploader :value="material.data.map_normal" @input="changeMapNormal" :width="60"
                                            :height="60"></image-uploader>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="8">
                        <el-tooltip class="item" effect="dark" content="高光图" placement="top">
                            <image-uploader :value="material.data.map_specular" @input="changeMapSpecular" :width="60"
                                            :height="60"></image-uploader>
                        </el-tooltip>
                    </el-col>
                </el-form-item>
                <el-form-item></el-form-item>
            </el-form>
        </div>
    </el-collapse-item>
</template>

<script>
    import {imagePath} from "@/api/s3";
    import {mapState} from 'vuex'
    import {validateName} from "@/utils/validate"
    import * as THREE from 'three'
    import ImageUploader from "../../ImageUploader";
    import {loadFabricImage} from "../extend/materials";

    export default {
        components: {ImageUploader},
        name: "item-materials",
        data() {
            return {
                disabled: true, // 材质面板是否可用
                name: '', // 当前操作的材质名称(name)
                object: {}, // 当前操作的三维对象
                material: {}, // 当前材质对象
            }
        },
        computed: {
            ...mapState({
                materials: state => state.sceneEditor._materials,
                selectedObj: state => state.sceneEditor.selected.obj,
                editableMaterialMap: state => state.sceneEditor.setting.editableMaterialMap,
                editableMaterialNormalMap: state => state.sceneEditor.setting.editableMaterialNormalMap,
                editableMaterialSpecularMap: state => state.sceneEditor.setting.editableMaterialSpecularMap,
            })
        },
        watch: {
            selectedObj(val) {
                console.log(this.materials)
                if (val && val.handler) {
                    this.object = this.$store.state.sceneEditor._objects[val.handler];
                    this.name = this.object.material;
                    this.disabled = false;
                } else {
                    this.name = '';
                    this.disabled = true;
                }
            },
            name(val) {
                if (this.materials.hasOwnProperty(val)) {
                    this.object.material = val;
                    this.material = this.materials[val];
                    if (this.materials.hasOwnProperty(val)) {

                    } else {
                        this.material = this.materials['default'];
                    }
                } else {
                    this.material = null;
                }
            },
        },
        methods: {
            createMaterial() {
                this.$prompt('请输入材质名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValidator: this.validMaterialName,
                }).then(({value}) => {
                    let mtl = {id: value, name: value, type: 'phong'};
                    this.$store.dispatch('AddMaterial', mtl).then(() => {
                        this.$forceUpdate();
                    });
                })
            },
            validMaterialName(name) {
                if (validateName(name)) {
                    if (this.materials.hasOwnProperty(name)) {
                        return '当前材质名称已存在';
                    } else {
                        return true;
                    }
                } else {
                    return '请输入中文、英文或数字'
                }
            },
            changeColor(val) {
                if (this.material.data.color === val) return;
                this.material.data.color = val;
                this.material.mtl.color = new THREE.Color(val);
                this.render();
            },
            changeSpecular(val) {
                if (this.material.data.specular === val) return;
                this.material.data.specular = val;
                this.material.mtl.specular = new THREE.Color(val);
                this.render();
            },
            changeShininess(val) {
                if (this.material.data.shininess === val) return;
                this.material.data.shininess = val;
                this.material.mtl.shininess = val;
                this.render();
            },
            changeTransparent(val) {
                if (this.material.data.transparent === val) return;
                this.material.data.transparent = val;
                this.material.mtl.transparent = val;
                this.render();
            },
            changeOpacity(val) {
                if (this.material.data.opacity === val) return;
                this.material.data.opacity = val;
                this.material.mtl.opacity = val;
                this.render();
            },
            changeMapColor(val) {
                if (this.material.data.map_color === val) return;
                this.material.data.map_color = val;
                if (this.editableMaterialMap) {
                    loadFabricImage(imagePath(val), (res) => {
                        this.material.map_canvas.canvas.backgroundImage = res;
                        this.material.map_canvas.canvas.renderAll();
                        this.material.mtl.map.needsUpdate = true;
                        this.render();
                    })
                } else {
                    new THREE.TextureLoader().load(imagePath(val), (res) => {
                        res.name = val;
                        this.material.mtl.map = res;
                        this.material.mtl.map.needsUpdate = true;
                        this.render();
                    }, null, (err) => {
                        this.material.mtl.map = null;
                        this.material.mtl.map.needsUpdate = true;
                        this.render();
                    });
                }
            },
            changeMapNormal(val) {
                if (this.material.data.map_normal === val) return;
                this.material.data.map_normal = val;
                new THREE.TextureLoader().load(imagePath(val), (res) => {
                    res.name = val;
                    this.material.mtl.normalMap = res;
                    this.material.mtl.normalMap.needsUpdate = true;
                    this.render();
                }, null, (err) => {
                    this.material.mtl.normalMap = null;
                    this.material.mtl.normalMap.needsUpdate = true;
                    this.render();
                });
            },
            changeMapSpecular(val) {
                if (this.material.data.map_specular === val) return;
                this.material.data.map_specular = val;
                new THREE.TextureLoader().load(imagePath(val), (res) => {
                    res.name = val;
                    this.material.mtl.specularMap = res;
                    this.material.mtl.specularMap.needsUpdate = true;
                    this.render();
                }, null, (err) => {
                    this.material.mtl.specularMap = null;
                    this.material.mtl.specularMap.needsUpdate = true;
                    this.render();
                });
            },
            render() {
                this.material.mtl.needsUpdate = true;
                this.$store.dispatch('SceneRender').then()
            },
            Transparent(value) {
                return value === true || value === "1" || value === 1;
            }
        },
        mounted() {
            this.$store.dispatch('AddDefaultMaterial')
        }
    }
</script>

<style scoped>
    #item-materials {
        background-color: #F5F7FA;
        padding: 0 10px 0 0;
    }

    .el-select {
        width: 200px;
    }

    .new {
        color: rgba(255, 53, 0, 0.97);
        text-indent: 2em;
    }
</style>
