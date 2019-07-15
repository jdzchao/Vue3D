/**
 * 所有mixins需要在mounted之前创建Object3d对象
 */
import * as THREE from 'three'

export default {
    name: "Object3d",
    props: {
        inTree: {type: Boolean, default: true}, // 是否挂载在树节点上。当设置为false时直接挂载在scene根节点上
        name: {type: String, default: ''},
        position: {
            type: Object, default() {
                return new THREE.Vector3()
            }
        },
        rotation: {
            type: Object, default() {
                return new THREE.Euler()
            }
        },
        scale: {
            type: Object, default() {
                return new THREE.Vector3(1, 1, 1)
            }
        },
        target: {
            type: Object,
            default() {
                return {x: 0, y: 0, z: 0}
            }
        },
    },
    data() {
        return {
            vue3d: null, // Vue3D component
            scene: null, // mounted scene
            parent: null, // 父级三维对象
            object3d: null, // 当前三维对象

            slot: false, // 是否挂载子节点
            visible: true, // 是否可见
        }
    },
    created() {
        if (!this.$parent) {
            console.error(this.$options.name + " must slot in Vue3D-Component");
            return;
        }
        // check Vue3D component parent
        if (!this.parent) {
            this._recursion(this.$parent)
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
        this.slot = false;
        this.removeObject3d(this.object3d);
    },
    methods: {
        init() {
            this.object3d.vComponent = this;
            this.object3d.name = this.name || this.$options.name;

            this.addObject3d(this.object3d);
            this.setPosition(this.position);
            this.setRotation(this.rotation);
            this.setScale(this.scale);
            this.setTarget();

            this.slot = true;
            this.$emit('ready', this.object3d);
            this.render();
        },
        // 根据vue组件递归查询scene节点
        _recursion(parent) {
            if (parent.$options.name === 'Vue3d') { // 当前挂载于Vue3D 根节点
                this.scene = parent.scenes.activated();
                this.vue3d = parent;
                this.parent = parent;
            } else if (parent.$options.name === 'V3dScene') { // 当前挂载于 V3dScene 子节点
                this.scene = parent.scene;
                this.vue3d = parent.vue3d;
                this.parent = parent;
            } else if (parent.hasOwnProperty("scene") && parent.hasOwnProperty('object3d')) { // 当前挂载于 其他 子节点
                this.scene = parent.scene;
                this.vue3d = parent.vue3d;
                this.parent = parent;
            } else {
                this._recursion(parent.$parent);
            }
        },
        addObject3d(object3d) {
            if (this.inTree && this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.add(object3d);
            } else {
                this.scene.add(object3d);
            }
        },
        removeObject3d(object3d) {
            if (this.inTree && this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.remove(object3d);
            } else {
                this.scene.remove(object3d);
            }
            this.vue3d.off("update", this.onRender);
        },
        setPosition(val) {
            if (val.isVector3) {
                this.object3d.position = val;
            } else if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
                let position = new THREE.Vector3(val.x, val.y, val.z);
                this.object3d.position = position;
                this.$emit("update:position", position);
            }
            this.render();
        },
        setRotation(val) {
            if (val.isEuler) {
                this.object3d.rotation = val;
            } else if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
                let rotation = new THREE.Euler(val.x, val.y, val.z);
                this.object3d.rotation = rotation;
                this.$emit("update:rotation", rotation);
            }
            this.render();
        },
        setScale(val) {
            if (val.isVector3) {
                this.object3d.scale = val;
            } else if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
                let scale = new THREE.Vector3(val.x, val.y, val.z);
                this.object3d.scale = scale;
                this.$emit("update:scale", scale);
            }
            this.render();
        },
        setTarget() {
            this.object3d.lookAt(this.target.x, this.target.y, this.target.z);
            this.render();
        },
        // 渲染
        render() {
            this.vue3d.render();
        },
        onRender() {
            this.$emit('update', this.object3d);
        },
    },
    watch: {
        name(val, oldVal) {
            if (val === oldVal) return;
            this.object3d.name = val;
        },
        target(val, oldVal) {
            if (val === oldVal) return;
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
    },
}
