<template>
    <div class="app-wrapper">
        <navbar></navbar>
        <div class="page-container">
            <app-main/>
        </div>
        <foot-bar></foot-bar>
    </div>
</template>

<script>
    import {AppMain, Navbar, FootBar} from './page_site/index'

    export default {
        name: "PageSite",
        components: {
            FootBar,
            AppMain,
            Navbar
        },
    }
</script>
