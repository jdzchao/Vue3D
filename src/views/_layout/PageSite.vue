<template>
    <div class="app-wrapper">
        <navbar></navbar>
        <div class="page-container">
            <app-main/>
        </div>
    </div>
</template>

<script>
    import {AppMain, Navbar} from './page_site/index'

    export default {
        name: "PageSite",
        components: {
            AppMain, Navbar
        },
    }
</script>
