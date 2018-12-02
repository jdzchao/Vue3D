<template>
    <div class="foot-bar">
        <copyright></copyright>
    </div>
</template>

<script>
    import Copyright from "@/components/Copyright/index";

    export default {
        name: "FootBar",
        components: {Copyright}
    }
</script>

<style scoped>
    .foot-bar {
        width: 100%;
        height: 29px;
        line-height: 29px;
        background-color: #545c64;
        text-align: center;
    }

    p {
        margin: 0;
        color: #99a9bf;
        font-size: 12px;
    }
</style>
