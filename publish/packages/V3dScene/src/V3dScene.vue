<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot"></slot>
    </object>
</template>
<script>
    export default {
        name: "V3dScene",
        props: {
            id: {type: String, required: true}
        },
        data() {
            return {
                $_canvas: null,
                $_scene: null,
                $_camera: null,
                vue3d: null,
                scene: null,
                slot: false,
            }
        },
        created() {
            let base = this.$parent.vue3d && this.$parent.vue3d();
            if (base) {
                this.$data.$_canvas = base.$_canvas;
                this.$data.$_scene = base.$_scene;
                this.$data.$_camera = base.$_camera;
                this.vue3d = this.$parent;
                this.scene = this.$parent.add_scene(this.id);
                this.slot = true;
            } else {
                console.error(this.$options.name + " should slot on Vue3D Component");
            }
        }
    }
</script>

