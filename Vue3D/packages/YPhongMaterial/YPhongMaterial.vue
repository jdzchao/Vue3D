<template>
  <object></object>
</template>

<script>
  import Mat from '../Materials'

  export default {
    name: "y-phong-material",
    mounted() {
      this.$parent.mtl = Mat.glass();
      console.log(this.$options.name);
    }
  }
</script>

<style scoped>

</style>
