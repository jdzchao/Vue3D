<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'm-scene',
    data() {
      return {

      }
    },
    props: {
      value: {},
    },
    created() {
      console.log(this.value);
    }
  }
</script>

<style scoped>

</style>
