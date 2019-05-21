<template>
    <div id="app">
        <top-bar></top-bar>
        <scene-content></scene-content>
        <foot-bar></foot-bar>
    </div>
</template>

<script>
    import TopBar from "@c/TopBar";
    import FootBar from "@c/FootBar";
    import SceneContent from "@c/SceneContent";

    export default {
        name: 'app',
        components: {SceneContent, FootBar, TopBar},
    }
</script>
<style>
    html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #app {
        width: 100%;
        height: 100%;
    }
</style>
