<template>
    <el-card class="card-uv-info" shadow="hover" v-show="show">
        <div slot="header">
            <span>{{item.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="remove">移除</el-button>
        </div>
        <el-form ref="form" :inline="true" :model="item" label-width="50px" label-position="left">
            <el-form-item label="分组">
                {{item.group}}
            </el-form-item>
            <el-form-item label="形状">
                {{item.shape}}
            </el-form-item>
            <el-form-item label="宽度">
                {{item.width}} px
            </el-form-item>
            <el-form-item label="高度">
                {{item.height}} px
            </el-form-item>
            <el-form-item label="X偏移">
                <el-input-number :disabled="!onSelected" size="mini" :min="0" :max="1024" :value="item.x" @input="setX"
                                 :controls="false"></el-input-number>
            </el-form-item>
            <el-form-item label="Y偏移">
                <el-input-number :disabled="!onSelected" size="mini" :min="0" :max="1024" :value="item.y" @input="setY"
                                 :controls="false"></el-input-number>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import {shape} from '../extend/materials'

    export default {
        name: "CardUvInfo",
        props: {item: [Object, undefined]},
        data() {
            return {
                holder: null,
                material: {},
            }
        },
        mounted() {
            this.material = this.materials[this.item.material_name];
            if (this.item.shape === "rect") {
                this.holder = shape.rect(this.item, this.color);
            } else if (this.item.shape === "circle") {
                this.holder = shape.circle(this.item, this.color);
            }
            this.material.map_canvas.canvas.add(this.holder);
            this.render();
        },
        beforeDestroy() {
            this.material.map_canvas.canvas.remove(this.holder);
            this.render();
        },
        computed: {
            ...mapState({
                materials: state => state.sceneEditor._materials
            }),
            ...mapGetters({
                material_name: 'sceneSelectedMaterialName',
                onSelected: 'sceneSelected'
            }),
            color() {
                return this.$store.state.sceneEditor.setting.uvGroupColors[this.item.group];
            },
            show() {
                return this.material_name === this.item.material_name;
            }
        },
        methods: {
            remove() {
                this.$store.state.sceneEditor.data.uvs.splice(this.$store.state.sceneEditor.data.uvs.indexOf(this.item), 1);
            },
            setX(val) {
                if (!val || !this.holder) return;
                let n = this.$store.state.sceneEditor.data.uvs.indexOf(this.item);
                this.$store.state.sceneEditor.data.uvs[n].x = val;
                this.holder.left = Number(val);
                this.render();
            },
            setY(val) {
                if (!val || !this.holder) return;
                let n = this.$store.state.sceneEditor.data.uvs.indexOf(this.item);
                this.$store.state.sceneEditor.data.uvs[n].y = val;
                this.holder.top = Number(val);
                this.render();
            },
            render() {
                this.material.map_canvas.canvas.renderAll();
                this.material.mtl.needsUpdate = true;
                this.material.mtl.map.needsUpdate = true;
                this.$store.dispatch("SceneRender").then();
            }
        }
    }
</script>

<style scoped>
    .card-uv-info {
        margin: 0 0 5px 0;
    }

    .el-form-item {
        width: 124px;
        margin-bottom: 0
    }

    .el-input-number--mini {
        width: 74px;
    }
</style>
