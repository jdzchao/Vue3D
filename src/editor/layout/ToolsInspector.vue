<template>
  <el-collapse v-model="activeCard">
    <card-transform></card-transform>
    <!--<card-objects></card-objects>-->
    <!--<card-materials></card-materials>-->
  </el-collapse>
</template>

<script>
  import CardTransform from "../panel/CardTransform";

  export default {
    name: "ToolsInspector",
    components: {CardTransform},
    data() {
      return {
        activeCard: ['transform', 'materials'],
      }
    }
  }
</script>

