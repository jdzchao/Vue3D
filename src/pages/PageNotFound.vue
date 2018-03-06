<template>
  <div id="404" class="error">
    <h1>404</h1>
    <h2> Page Not Found</h2>
    <p><a href="javascript:void(0);" @click="goBack">Click here </a> to go back.</p>
  </div>
</template>

<script>
  export default {
    name: "page-not-found",
    methods: {
      goBack() {
        window.history.go(-1);
      }
    }
  }
</script>

<style scoped>
  .error {
    width: 1000px;
    margin: 0 auto;
    text-align: center;
  }

  h1 {
    font-size: 100px;
  }
</style>
