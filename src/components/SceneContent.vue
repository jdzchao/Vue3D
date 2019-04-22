<template>
    <div id="content">
        <demo-dev></demo-dev>
    </div>
</template>

<script>
    import DemoDev from "@c/demo/DemoDev";

    export default {
        name: "SceneContent",
        components: {DemoDev}
    }
</script>

<style scoped>
    #content {
        width: 100%;
        height: calc(100% - 90px);
    }
</style>
