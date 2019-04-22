<template>
    <div class="top-bar">
        <logo-vue3d></logo-vue3d>
    </div>
</template>

<script>
    import LogoVue3d from "@c/Vue3D";

    export default {
        name: "TopBar",
        components: {LogoVue3d}
    }
</script>

<style scoped>
    .top-bar {
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: #545c64;
    }
</style>
