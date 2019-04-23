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
        position: relative;
    }

    .top-bar:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        border-bottom: 1px solid #d9d9d9;
        color: #d9d9d9;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
        z-index: 5;
    }
</style>
