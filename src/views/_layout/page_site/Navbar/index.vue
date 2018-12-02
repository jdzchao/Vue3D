<template>
    <el-menu :default-active="active" mode="horizontal"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <template v-for="route in permission_routers" v-if="!route.hidden&&route.children">
            <navbar-item :key="route.path" :item="route" :base-path="route.path"></navbar-item>
        </template>
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
                active: this.$route.fullPath,
            };
        },
        computed: {
            ...mapGetters([
                'permission_routers',
            ]),
        }
    }
</script>

