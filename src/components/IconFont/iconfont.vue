<template>
    <i :class="`iconfont icon-${type}`" :style="styles"></i>
</template>

<script>
    export default {
        name: 'IconFont',
        props: {
            type: {
                type: String,
                required: true
            },
            color: {
                type: String,
                default: 'auto'
            },
            size: {
                type: Number,
                default: 16
            }
        },
        computed: {
            styles() {
                return {
                    fontSize: `${this.size}px`,
                    color: this.color
                }
            }
        }
    }
</script>

<style>

</style>
