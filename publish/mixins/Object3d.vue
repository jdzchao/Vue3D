<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot.usable"></slot>
    </object>
</template>

<script>
    /**
     * 所有mixins需要在mounted之前创建Object3d对象
     */
    import * as THREE from 'three'
    import {get_euler} from "../bus/utils";

    export default {
        name: "Object3d",
        props: {
            inTree: {type: Boolean, default: true}, // 是否挂载在树节点上。当设置为false时直接挂载在scene根节点上
            name: {type: String, default: ''},
            position: {type: Object},
            rotation: {type: Object},
            scale: {type: Object},
            target: {type: Object},
        },
        data() {
            return {
                scene: null, // mounted scene
                parent: null, // 父级三维对象
                object3d: null, // 当前三维对象
                slot: {
                    name: this.$options.name,
                    usable: false,
                    node: null,
                },
                visible: true, // 是否可见
            }
        },
        provide() {
            return {
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
            vScene: {
                default: () => {
                    return {};
                }
            },
            vSlot: {
                default: () => {
                    return {};
                }
            }
        },
        created() {
            if (this.vScene) {
                this.scene = this.vScene.scene;
            } else if (this.vue3d) {
                this.scene = this.vue3d.scenes.base;
            } else {
                console.error(this.$options.name + " should slot on Vue3D Component");
            }
        },
        mounted() {
            this.vue3d.on("update", this.render);
            if (this.object3d) this.init();
        },
        updated() {
            this.render();
        },
        beforeDestroy() {
            this.$emit('remove', this.object3d);
            this.closeSlot();
            this.removeObject3d(this.object3d);
            this.vue3d.off("update", this.render);
        },
        methods: {
            init() {
                this.object3d.vComponent = this;
                this.object3d.name = this.name || this.$options.name;

                this.setPosition(this.position);
                this.setRotation(this.rotation);
                this.setScale(this.scale);

                this.addObject3d(this.object3d);

                this.openSlot(this.object3d);

                this.$emit('ready', this.object3d);
                this.render();
            },
            addObject3d(object3d) {
                if (this.inTree && this.vSlot.node) {
                    this.vSlot.node.add(object3d);
                } else {
                    this.scene.add(object3d);
                }
            },
            removeObject3d(object3d) {
                if (this.inTree && this.vSlot.node) {
                    this.vSlot.node.remove(object3d);
                } else {
                    this.scene.remove(object3d);
                }
            },
            setPosition(val) {
                if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
                    this.object3d.position.set(this.position.x, this.position.y, this.position.z)
                }
                this.$emit("update:position", this.object3d.position);
                this.render();
            },
            setRotation(val) {
                if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
                    const x = get_euler(val.x);
                    const y = get_euler(val.y);
                    const z = get_euler(val.z);
                    let euler = new THREE.Euler(x, y, z);
                    this.object3d.setRotationFromEuler(euler);
                }
                this.$emit("update:rotation", this.object3d.rotation);
                this.render();
            },
            setScale(val) {
                if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
                    this.object3d.scale.set(this.scale.x, this.scale.y, this.scale.z)
                }
                this.$emit("update:scale", this.object3d.scale);
                this.render();
            },
            setTarget() {
                this.object3d.lookAt(this.target.x, this.target.y, this.target.z);
                this.render();
            },
            // 渲染
            render() {
                this.vue3d.render();
                this.onRender();
            },
            onRender() {
                this.$emit('update', this.object3d);
            },
            openSlot(node) {
                if (node && typeof node === 'object') {
                    this.slot.node = node;
                } else {
                    this.slot.node = this.scene;
                }
                this.slot.usable = true;
            },
            closeSlot() {
                this.slot.node = null;
                this.slot.usable = false;
            },
        },
        watch: {
            name(val, oldVal) {
                if (val === oldVal) return;
                this.object3d.name = val;
            },
            target(val, oldVal) {
                if (val && val === oldVal) return;
                this.setTarget();
            },
            position(val) {
                if (Object.is(this.object3d.position, val)) return;
                this.setPosition(val);
            },
            rotation(val) {
                if (Object.is(this.object3d.rotation, val)) return;
                this.setRotation(val);
            },
            scale(val) {
                if (Object.is(this.object3d.scale, val)) return;
                this.setScale(val);
            }
        }
    }
</script>
