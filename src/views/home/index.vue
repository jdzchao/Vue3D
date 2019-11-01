<template>
    <div id="home">
        <top-bar></top-bar>
        <scene-content></scene-content>
        <foot-bar></foot-bar>
    </div>
</template>

<script>
    import TopBar from "./components/TopBar";
    import FootBar from "./components/FootBar";
    import SceneContent from "./components/SceneContent";

    export default {
        name: 'home',
        components: {SceneContent, FootBar, TopBar},
    }
</script>

<style scoped>
    #home {
        width: 100%;
        height: 100%;
    }
</style>
