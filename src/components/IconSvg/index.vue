<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
    export default {
        name: 'IconSvg',
        props: {
            iconClass: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.iconClass}`
            },
            svgClass() {
                if (this.className) {
                    return 'icon-svg ' + this.className
                } else {
                    return 'icon-svg'
                }
            }
        }
    }
</script>

<style scoped>
    .icon-svg {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
