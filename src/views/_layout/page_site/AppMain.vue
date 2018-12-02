<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view :key="key"/>
            </keep-alive>
        </transition>
    </section>
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
            cachedViews() {
                return this.$store.state.tagsView.cachedViews
            },
            key() {
                return this.$route.fullPath
            }
        }
    }
</script>

<style scoped>
    .app-main {
        /*90 = navBar + footBar = 61 + 29 */
        height: calc(100vh - 90px);
        width: 100%;
        position: relative;
        overflow: hidden;
    }
</style>

