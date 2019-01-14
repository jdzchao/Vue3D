<template>
    <el-collapse-item name="uv-setter">
        <template slot="title">
            <icon-font type="panel"></icon-font>
            <span style="margin: 0 0 0 5px">UV-SETTER</span>
        </template>

        <div class="uv-setter">

            <el-input placeholder="单位毫米内分布像素比例" :value="uvRatio" @input="setRatio" class="input-with-select">
                <el-select :value="uvSize" @input="setSize" slot="prepend" placeholder="请选择">
                    <el-option label="1024" value="1024"></el-option>
                </el-select>
            </el-input>

            <el-form label-width="80px">
                <el-form-item label="定制编组:">
                    <el-radio-group v-model="group" size="medium" :fill="color">
                        <el-radio-button label="0"></el-radio-button>
                        <el-radio-button label="1"></el-radio-button>
                        <el-radio-button label="2"></el-radio-button>
                        <el-radio-button label="3"></el-radio-button>
                    </el-radio-group>
                    <el-radio-group v-model="group" size="medium" :fill="color">
                        <el-radio-button label="4"></el-radio-button>
                        <el-radio-button label="5"></el-radio-button>
                        <el-radio-button label="6"></el-radio-button>
                        <el-radio-button label="7"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <el-form label-width="80px" :rules="rules" ref="setter">
                <el-form-item label="名称:" prop="name">
                    <el-input placeholder="请输入名称" v-model="setter.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="形状:">
                    <el-select v-model="setter.shape">
                        <el-option label="矩形" value="rect"></el-option>
                        <el-option label="圆形" value="circle"></el-option>
                    </el-select>
                </el-form-item>
                <template v-if="setter.shape==='rect'">
                    <el-form-item label="宽:">
                        <el-input-number v-model="setter.width" :min="0" :max="1024"></el-input-number>
                    </el-form-item>
                    <el-form-item label="高:">
                        <el-input-number v-model="setter.height" :min="0" :max="1024"></el-input-number>
                    </el-form-item>
                </template>
                <template v-else-if="setter.shape==='circle'">
                    <el-form-item label="直径:">
                        <el-input-number v-model="setter.width" :min="0" :max="1024"></el-input-number>
                    </el-form-item>
                </template>
                <el-form-item>
                    <el-button type="primary" :disabled="disabled" @click="submitUvs">添加</el-button>
                </el-form-item>
            </el-form>

        </div>
    </el-collapse-item>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'

    export default {
        name: "ItemUvSetter",
        data() {
            return {
                group: null,
                setter: {
                    name: null,
                    width: 0,
                    height: 0,
                    shape: 'rect',
                },
                rules: {
                    name: [
                        {required: false, message: '请输入名称', trigger: 'blur'},
                        {min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted() {
            this.group = 0;
        },
        computed: {
            ...mapState({
                selectedObj: state => state.sceneEditor.selected.obj,
                uvs: state => state.sceneEditor.data.uvs,
                uvSize: state => state.sceneEditor.setting.uvSize,
                uvRatio: state => state.sceneEditor.setting.uvRatio,
            }),
            ...mapGetters({
                material_name: 'sceneSelectedMaterialName',
                onSelected: 'sceneSelected'
            }),
            color() {
                return this.$store.state.sceneEditor.setting.uvGroupColors[this.group];
            },
            disabled() {
                return !this.onSelected || !this.uvSize || !this.uvRatio;
            }
        },
        watch: {
            group(val) {
                if (this.$store.state.sceneEditor.setting.uv[val]) {
                    this.setter = this.$store.state.sceneEditor.setting.uv[val];
                }
            },
            "setter.width"(val) {
                if (this.setter.shape === 'circle') {
                    this.setter.height = val;
                }
            }
        },
        methods: {
            submitUvs() {
                this.addUvs();
                // TODO: 验证表单
                // this.$refs.setter.validate((valid) => {
                //   if (valid) {
                //     this.addUvs();
                //   } else {
                //     return false;
                //   }
                // });
            },
            addUvs() {
                if (!this.material_name) return;
                for (let item of this.uvs) {
                    if (!item) continue;
                    if (item.material_name === this.material_name && Number(item.group) === this.group) return;
                }
                let item = Object.assign({}, this.setter, {
                    material_name: this.material_name,
                    group: this.group,
                    x: 0,
                    y: 0,
                    ratio: this.uvRatio,
                    size: this.uvSize
                });
                this.$store.state.sceneEditor.data.uvs.push(item);
            },
            setRatio(val) {
                this.$store.state.sceneEditor.setting.uvRatio = val;
            },
            setSize(val) {
                this.$store.state.sceneEditor.setting.uvSize = val;
            },
        }
    }
</script>
