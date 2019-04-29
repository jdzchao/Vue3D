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
                renderer: null,
                scene: null,
                slot: false,
            }
        },
        created() {
            let base = this.$parent.fetch_base && this.$parent.fetch_base();
            if (base) {
                this.$data.$_canvas = base.$_canvas;
                this.$data.$_scene = base.$_scene;
                this.$data.$_camera = base.$_camera;
                this.renderer = base.renderer;
                this.scene = this.renderer.scenes_add(this.id);
                this.slot = true;
            } else {
                console.error(this.$options.name + " should slot on Vue3D Component");
            }
        }
    }
</script>

