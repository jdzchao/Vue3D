<template>
    <el-dialog :visible="visible" width="1000px" custom-class="addMesh" top="60px" :modal="false"
               @close="handleClose">
        <el-tabs class="dialog" v-model="activeName" type="card">
            <el-tab-pane label="选择" name="select">
                <mesh-list :o-width="80">
                    <template slot="operation" slot-scope="props">
                        <el-button type="text" size="small" @click="selectedMesh(props.data)">选择</el-button>
                    </template>
                </mesh-list>
            </el-tab-pane>
            <el-tab-pane label="上传" name="upload">
                <!--<mesh-upload @success="uploadMesh"></mesh-upload>-->
                <mesh-uploader @loaded="loaded" @progress="loading"></mesh-uploader>
                <mesh-form ref="form" :obj="obj" @submit="uploadMesh"></mesh-form>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
    import MeshList from "@/views/mesh/components/MeshList";
    import MeshUploader from "@/modules/MeshUploader/index";
    import MeshForm from "@/modules/MeshForm/index";

    export default {
        name: "PanelDialog",
        components: {
            MeshForm, MeshUploader,
            MeshList
        },
        data() {
            return {
                name: 'add-mesh',
                obj: {},
                activeName: 'select',
                hash: '',
                percentage: 0,
            }
        },
        computed: {
            visible() {
                this.activeName = this.$store.state.sceneEditor.dialog;
                return this.$store.state.sceneEditor.dialog !== "" && this.$store.state.sceneEditor.dialog !== null;
            }
        },
        methods: {
            handleClose() {
                this.$store.commit("CLOSE_DIALOG");
            },
            selectedMesh(obj) {
                this.addMesh(obj);
            },
            uploadMesh(obj) {
                this.addMesh(obj.data);
            },
            addMesh(obj) {
                this.$store.dispatch('AddObject', obj);
                this.$store.commit("CLOSE_DIALOG");
            },
            loaded(obj) {
                this.hash = obj.hash;
                this.obj = obj;
            },
            loading(res) {
                this.percentage = res;
            },

        }
    }
</script>

<style scoped>

</style>
