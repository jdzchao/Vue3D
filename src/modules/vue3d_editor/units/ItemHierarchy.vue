<template>
    <div id="item-hierarchy">
        <div class="tools">
            <el-button-group>
                <el-tooltip class="item" effect="dark" content="在选中节点上添加对象" placement="top">
                    <el-button @click="appendSelected">
                        <icon-font type="add"></icon-font>
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除选中节点内的对象" placement="top">
                    <el-button @click="removeSelected">
                        <icon-font type="subtract"></icon-font>
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="取消选中状态" placement="top">
                    <el-button @click="freeSelected">
                        <icon-font type="free"></icon-font>
                    </el-button>
                </el-tooltip>
            </el-button-group>
        </div>
        <div class="tree">
            <el-tree ref="tree" show-checkbox check-strictly :data="objects" @current-change="changeTarget"
                     :props="defaultProps" node-key="name" default-expand-all :expand-on-click-node="false"></el-tree>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "ItemHierarchy",
        data() {
            return {
                popover: false,
                defaultProps: {
                    children: 'objects',
                    label: 'name'
                },
                addMesh: false
            }
        },
        computed: {
            ...mapState({
                objects: state => state.sceneEditor.data.objects,
                selectedName: state => state.sceneEditor.selected.name,
            })
        },
        watch: {
            selectedName(val, oldVal) {
                if (val === oldVal) return;
                this.$refs.tree.setCurrentKey(val);
                this.$refs.tree.setCheckedKeys([val]);
            },
        },
        methods: {
            changeTarget(data) {
                this.$store.dispatch('GetSelectedByName', data.name).then();
            },
            appendSelected() {
                this.$store.commit('OPEN_DIALOG', 'select');
            },
            removeSelected() {
                this.$confirm('是否删除当前选中的对象，其子对象也将一并删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('RemoveObject').then(() => {
                        this.$notify({
                            title: '成功',
                            message: '成功删除对象',
                            type: 'success'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            freeSelected() {
                this.$store.commit('FREE_SELECTED');
            }
        }
    }
</script>

<style scoped>
    .tools {
        width: 100%;
        margin: 0 0 10px 0;
        overflow: hidden;
    }

    .tree {
        width: 100%;
    }
</style>
<style>
    #item-hierarchy .el-checkbox {
        pointer-events: none;
    }
</style>
