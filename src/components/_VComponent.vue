<template>
</template>
<script>
  export default {
    data() {
      return {
        ready: false,
      }
    },
    created() {
      console.debug('VC:created')
    },
    updated() {
      console.debug('VC:update');
    },
    methods: {
      render() {
        console.debug('VC:render');
      }
    }
  }
</script>
<style scoped>

</style>
