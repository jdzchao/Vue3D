<template>
  <div id="home">
    <router-link to="/example">Example</router-link>
    <router-link to="/editor">Editor</router-link>
  </div>
</template>

<script>
  export default {
    name: "home",
  }
</script>

<style scoped>
  #home {
    width: 1000px;
    margin: 0 auto;
  }
</style>
