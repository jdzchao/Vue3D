<template>
    <div class="navbar">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

        <breadcrumb class="breadcrumb-container"/>

        <div class="right-menu">
            <template v-if="device!=='mobile'">
                <error-log class="errLog-container right-menu-item"/>

                <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
                    <screenfull class="screenfull right-menu-item"/>
                </el-tooltip>

                <lang-select class="international right-menu-item"/>
            </template>

            <el-dropdown class="avatar-container right-menu-item" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="img(avatar)" :err="false" class="user-avatar" @error="avatarOnError">
                    <i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item>
                            {{ $t('navbar.home') }}
                        </el-dropdown-item>
                    </router-link>
                    <router-link to="/mine">
                        <el-dropdown-item>
                            {{ $t('navbar.mine') }}
                        </el-dropdown-item>
                    </router-link>
                    <router-link to="/mine">
                        <el-dropdown-item>
                            {{ $t('navbar.security') }}
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">{{ $t('navbar.logout') }}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import ErrorLog from '@/components/ErrorLog'
    import Hamburger from '@/components/Hamburger'
    import LangSelect from '@/components/LangSelect'
    import Screenfull from '@/components/Screenfull'
    import {storage} from "@/api/storage";

    export default {
        components: {
            Breadcrumb,
            ErrorLog,
            Hamburger,
            Screenfull,
            LangSelect
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'name',
                'avatar',
                'device'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar').then()
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            },
            img(avatar) {
                return storage(avatar)
            },
            avatarOnError(e) {
                if (!e.target.err) {
                    e.target.err = true;
                    return e.target.src = storage('avatar/default.png')
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .breadcrumb-container {
            float: left;
        }
        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }
        .right-menu {
            float: right;
            height: 100%;
            &:focus {
                outline: none;
            }
            .right-menu-item {
                display: inline-block;
                margin: 0 8px;
            }
            .screenfull {
                height: 20px;
            }
            .international {
                vertical-align: top;
            }
            .avatar-container {
                height: 50px;
                margin-right: 30px;
                .avatar-wrapper {
                    cursor: pointer;
                    margin-top: 5px;
                    position: relative;
                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }
                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>

