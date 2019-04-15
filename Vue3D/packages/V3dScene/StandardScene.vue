<template>
    <object name="stand-scene">
        <slot></slot>
    </object>
</template>
<script>
    export default {
        name: "StandardScene",
        data() {
            return {
                V$dom: this.$parent.dom,
                V$scene: this.$parent.scene,

            }
        }
    }
</script>

