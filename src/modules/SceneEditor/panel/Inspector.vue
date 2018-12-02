<template>
    <el-collapse v-model="activeCard">
        <item-transform></item-transform>
        <item-materials></item-materials>
    </el-collapse>
</template>

<script>
    import ItemTransform from "../units/ItemTransform";
    import ItemMaterials from "../units/ItemMaterials";

    export default {
        name: "PanelInspector",
        components: {ItemMaterials, ItemTransform},
        data() {
            return {
                activeCard: ['transform', 'materials'],
            }
        }
    }
</script>
