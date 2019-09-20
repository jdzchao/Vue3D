<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot.usable"></slot>
    </object>
</template>
<script>
    export default {
        name: "V3dScene",
        props: {
            name: {type: String | Number, required: true}
        },
        data() {
            return {
                scene: this.vue3d.scenes.add(this.name),
                /* Component Slot */
                slot: {
                    name: "V3dScene",
                    usable: false,
                    node: null,
                },
            }
        },
        provide() {
            return {
                vScene: this,
                vSlot: this.slot
            };
        },
        inject: {
            vue3d: {
                default: () => {
                    console.error(this.$options.name + " should slot on Vue3D Component");
                    return {};
                }
            },
            vSlot: {
                default: () => {
                    return {};
                }
            }
        },
        beforeMount() {
            this.scene.vComponent = this;
            this.openSlot();
        },
        methods: {
            openSlot() {
                this.slot.node = this.scene;
                this.slot.usable = true;
            },
            closeSlot() {
                this.slot.node = null;
                this.slot.usable = false;
            },
        }

    }
</script>

