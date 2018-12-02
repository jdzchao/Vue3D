<template>
    <div id="scene-editor">
        <div class="viewport">
            <panel-scene></panel-scene>
        </div>
        <div class="tools">
            <el-tabs type="border-card" class="tabs">
                <el-tab-pane label="Inspector">
                    <panel-inspector></panel-inspector>
                </el-tab-pane>
                <el-tab-pane label="Hierarchy">
                    <panel-hierarchy></panel-hierarchy>
                </el-tab-pane>
                <el-tab-pane label="Customized">
                    <panel-customized></panel-customized>
                </el-tab-pane>
            </el-tabs>
            <panel-menu></panel-menu>
        </div>
        <panel-dialog></panel-dialog>
    </div>
</template>

<script>
    import PanelScene from "@/modules/SceneEditor/panel/Scene";
    import PanelInspector from "@/modules/SceneEditor/panel/Inspector";
    import PanelHierarchy from "@/modules/SceneEditor/panel/Hierarchy";
    import PanelCustomized from "@/modules/SceneEditor/panel/Customized";
    import PanelMenu from "@/modules/SceneEditor/panel/Menu";
    import PanelDialog from "@/modules/SceneEditor/panel/Dialog";

    export default {
        name: "SceneEditor",
        components: {PanelDialog, PanelMenu, PanelCustomized, PanelHierarchy, PanelInspector, PanelScene},
        destroyed() {
            this.$store.dispatch("SceneClear").then()
        }
    }
</script>

<style scoped>
    #scene-editor {
        position: relative;
        width: 100%;
        height: calc(100vh - 104px);
        overflow: hidden;
    }

    .viewport {
        float: left;
        width: calc(100% - 350px);
        height: 100%;
        overflow: hidden;
        background-color: #000000;
    }

    .tools {
        float: left;
        width: 350px;
        height: 100%;
        overflow: hidden;
    }

    .tabs {
        width: 100%;
        height: calc(100% - 61px);
    }

</style>
<style>
    .tabs .el-tabs__content {
        overflow-y: scroll;
        height: calc(100% - 39px);
    }

    .tabs .el-tabs__content::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    .tabs .el-tabs__content::-webkit-scrollbar {
        width: 3px;
        background-color: #F5F5F5;
    }

    .tabs .el-tabs__content::-webkit-scrollbar-thumb {
        background-color: #545c64;
    }
</style>