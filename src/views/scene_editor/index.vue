<template>
    <scene-editor></scene-editor>
</template>

<script>
    import SceneEditor from "@/modules/SceneEditor/index";

    export default {
        name: "scene_editor",
        components: {
            SceneEditor,
        },
        data() {
            return {
                id: this.$route.query.id
            }
        },
        methods: {
            load() {
                this.$store.dispatch('LoadSceneData', {id: this.id}).then()
            }
        },
        mounted() {
            this.load();
        }
    }
</script>