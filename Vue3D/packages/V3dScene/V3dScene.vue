<template>
    <object name="scene">
        <slot></slot>
    </object>
</template>
<script>
    export default {
        name: "StandardScene",
        data() {
            return {
                V$dom: this.$parent.V$dom,
                V$scene: this.$parent.scene,
                renderer: this.$parent.renderer
            }
        }
    }
</script>

