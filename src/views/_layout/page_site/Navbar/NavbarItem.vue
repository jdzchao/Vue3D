<template>
    <el-menu-item
            v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
            :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}"
            :route="resolvePath(item.path)">
        <app-link :to="resolvePath(item.path)" :key="item.name" style="display: inline-block">
            <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon"/>
            <span>{{generateTitle(onlyOneChild.meta.title)}}</span>
        </app-link>
    </el-menu-item>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
        <template slot="title">
            <item v-if="item.meta" :icon="item.meta.icon" :title="generateTitle(item.meta.title)"/>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
            <navbar-item v-if="child.children&&child.children.length>0"
                         :is-nest="true"
                         :item="child"
                         :key="child.path"
                         :base-path="resolvePath(child.path)"></navbar-item>
            <app-link v-else :to="resolvePath(child.path)" :key="child.name">
                <el-menu-item :index="resolvePath(child.path)">
                    <item v-if="child.meta" :icon="child.meta.icon" :title="generateTitle(child.meta.title)"/>
                </el-menu-item>
            </app-link>
        </template>
    </el-submenu>

</template>

<script>
    import path from 'path'
    import {generateTitle} from '@/utils/i18n'
    import {isExternal} from '@/utils'
    import Item from './Item'
    import AppLink from './Link'

    export default {
        name: "NavbarItem",
        components: {Item, AppLink},
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                onlyOneChild: null
            }
        },
        methods: {
            hasOneShowingChild(children, parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        // Temp set(will be used if only has one showing child)
                        this.onlyOneChild = item
                        return true
                    }
                })

                // When there is only one child router, the child router is displayed by default
                if (showingChildren.length === 1) {
                    return true
                }

                // Show parent if there are no child router to display
                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                    return true
                }

                return false
            },
            resolvePath(routePath) {
                if (this.isExternalLink(routePath)) {
                    return routePath
                }
                return path.resolve(this.basePath, routePath)
            },
            isExternalLink(routePath) {
                return isExternal(routePath)
            },
            generateTitle
        }
    }
</script>
<style scoped>
    span {
        margin: 0  0 0 8px
    }
</style>
