<template>
    <el-collapse v-model="activeCard">
        <item-uv></item-uv>
        <item-uv-preview></item-uv-preview>
        <item-uv-setter></item-uv-setter>
    </el-collapse>
</template>

<script>
    import ItemUv from "../units/ItemUv";
    import ItemUvPreview from "../units/ItemUvPreview";
    import ItemUvSetter from "../units/ItemUvSetter";

    export default {
        name: "PanelCustomized",
        components: {ItemUv, ItemUvPreview, ItemUvSetter},
        data() {
            return {
                activeCard: ['uv', 'uv-preview', 'uv-setter'],
            }
        }
    }
</script>

<style scoped>

</style>