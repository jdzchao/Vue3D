<template>
    <el-collapse-item id="item-transform" name="transform">
        <template slot="title">
            <icon-font type="panel"></icon-font>
            <span style="margin: 0 0 0 5px">TRANSFORM</span>
        </template>
        <div class="buttons">
            <el-button-group>
                <el-tooltip class="item" effect="light" content="Reset" placement="top">
                    <el-button @click="reset" :disabled="disabled">
                        <icon-font type="reset"></icon-font>
                    </el-button>
                </el-tooltip>
            </el-button-group>
            <el-radio-group v-model="transform" @change="changeMode" style="float:right">
                <el-radio-button label="translate" :disabled="disabled">
                    <icon-font type="translate"></icon-font>
                </el-radio-button>
                <el-radio-button label="rotate" :disabled="disabled">
                    <icon-font type="rotation"></icon-font>
                </el-radio-button>
                <el-radio-button label="scale" :disabled="disabled">
                    <icon-font type="scale"></icon-font>
                </el-radio-button>
            </el-radio-group>
        </div>
        <div class="tf-group">
            <div class="input-group">
                <label>Position</label>
                <el-input-number v-model="position.x" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="position.y" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="position.z" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
            </div>
        </div>
        <div class="tf-group">
            <div class="input-group">
                <label>Rotation</label>
                <el-input-number v-model="axis.x" @change="setAxisX" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="axis.y" @change="setAxisY" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="axis.z" @change="setAxisZ" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
            </div>
        </div>
        <div class="tf-group">
            <div class="input-group">
                <label>Scale</label>
                <el-input-number v-model="scale.x" :step="0.1" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="scale.y" :step="0.1" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
                <el-input-number v-model="scale.z" :step="0.1" :disabled="disabled" size="mini"
                                 controls-position="right"></el-input-number>
            </div>
        </div>
    </el-collapse-item>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "ItemTransform",
        data() {
            return {
                disabled: true,
                handler: '',
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: {x: 1, y: 1, z: 1},
                axis: {x: 0, y: 0, z: 0},
                transform: this.$store.state.sceneEditor.setting.transform,
            }
        },
        computed: {
            ...mapState({
                selected: state => state.sceneEditor.selected.obj,
            })
        },
        watch: {
            selected(val) {
                if (val) {
                    this.handler = val.handler;
                    this.position = val.position;
                    this.rotation = val.rotation;
                    this.scale = val.scale;
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            },
            position: {
                deep: true,
                handler(val, oldVal) {
                    if (!this.selected && val === oldVal) return;
                    this.position.x = parseFloat(val.x.toFixed(2));
                    this.position.y = parseFloat(val.y.toFixed(2));
                    this.position.z = parseFloat(val.z.toFixed(2));
                    this.sync();
                }
            },
            rotation: {
                deep: true,
                handler(val, oldVal) {
                    if (!this.selected && val === oldVal) return;
                    this.axis.x = Math.round((val.x * 180 / Math.PI));
                    this.axis.y = Math.round((val.y * 180 / Math.PI));
                    this.axis.z = Math.round((val.z * 180 / Math.PI));
                    this.sync();
                }
            },
            scale: {
                deep: true,
                handler(val, oldVal) {
                    if (!this.selected && val === oldVal) return;
                    this.scale.x = parseFloat(val.x.toFixed(2));
                    this.scale.y = parseFloat(val.y.toFixed(2));
                    this.scale.z = parseFloat(val.z.toFixed(2));
                    this.sync();
                }
            },
        },
        methods: {
            reset() {
                this.position.x = 0;
                this.position.y = 0;
                this.position.z = 0;
                this.rotation.x = 0;
                this.rotation.y = 0;
                this.rotation.z = 0;
                this.scale.x = 1;
                this.scale.y = 1;
                this.scale.z = 1;
            },
            setAxisX(n) {
                this.rotation.x = parseFloat((n * Math.PI / 180).toFixed(2));
            },
            setAxisY(n) {
                this.rotation.y = parseFloat((n * Math.PI / 180).toFixed(2));
            },
            setAxisZ(n) {
                this.rotation.z = parseFloat((n * Math.PI / 180).toFixed(2));
            },
            changeMode(transform) {
                this.$store.state.sceneEditor.setting.transform = transform;
            },
            sync() {
                this.$store.state.sceneEditor._objects[this.handler].position = this.position;
                this.$store.state.sceneEditor._objects[this.handler].rotation = this.rotation;
                this.$store.state.sceneEditor._objects[this.handler].scale = this.scale;
            }
        }
    }
</script>

<style scoped>
    #item-transform {
        position: relative;
        width: 100%;
    }

    .buttons {
        width: 100%;
        margin: 0 0 5px 0;
    }

    .tf-group {
        background-color: #F5F7FA;
        text-align: center;
        overflow: hidden;
        line-height: 10px;
        border-radius: 4px;
        border: 1px solid #d3d3d3;
        margin: 0 0 5px 0;
    }

    .tf-group label {
        display: block;
        height: 15px;
        width: 100%;
        font-size: 12px;
        line-height: 15px;
        color: #999999;
    }

    .el-input-number {
        width: 100px;
        margin: 0 1px 0 0;
    }

    .el-form-item {
        margin: 0 0 5px 0;
    }
</style>
<style>
    #item-transform .el-input-number.is-controls-right .el-input__inner {
        padding-left: 5px;
        padding-right: 35px;
    }
</style>
