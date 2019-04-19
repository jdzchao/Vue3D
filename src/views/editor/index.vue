<template>
    <vue3d-editor/>
</template>

<script>
    import Vue3dEditor from "@/modules/vue3d_editor/index";

    export default {
        name: "vue3d",
        components: {
            Vue3dEditor,
        },
        data() {
            return {
                id: this.$route.query.id
            }
        },
        methods: {
            load() {
                // this.$store.dispatch('LoadSceneData', {id: this.id}).then()
            }
        },
        mounted() {
            this.load();
        }
    }
</script>
