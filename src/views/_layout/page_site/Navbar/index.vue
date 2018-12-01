<template>
    <el-menu :default-active="active" mode="horizontal"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <navbar-item v-for="route in permission_routers" :key="route.path" :item="route"
                     :base-path="route.path"></navbar-item>
    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'
    import NavbarItem from "./NavbarItem";

    export default {
        name: "Navbar",
        components: {NavbarItem},
        data() {
            return {
                active: '1',
            };
        },
        computed: {
            ...mapGetters([
                'permission_routers',
            ]),
        },
        mounted() {
            console.log(this.permission_routers)
        }
    }
</script>

