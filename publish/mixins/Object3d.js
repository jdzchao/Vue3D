/**
 * 所有mixins需要在mounted之前创建Object3d对象
 */
export default {
    name: "Object3d",
    props: {
        inTree: {type: Boolean, default: true}, // 是否挂载在树节点上。当设置为false时直接挂载在scene根节点上
        position: {
            type: Object,
            default: () => {
                return {x: 0, y: 0, z: 0}
            }
        },
        rotation: {
            type: Object,
            default: () => {
                return {x: 0, y: 0, z: 0}
            }
        },
        scale: {
            type: Object,
            default: () => {
                return {x: 1, y: 1, z: 1}
            }
        },
        target: {
            type: Object,
            default: () => {
                return {x: 0, y: 0, z: 0}
            }
        },
        name: {
            type: String,
        }
    },
    data() {
        return {
            vue3d: null, // Vue3D component
            scene: null, // mounted scene
            object3d: null, // 当前三维对象
            parent: null, // 父级三维对象
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
        this.onDestroy();
        this.slotOut();
        this._removeObject3d(this.object3d);
    },
    methods: {
        init() {
            this.object3d.name = this.name || this.$options.name;
            this.setPosition();
            this.setRotation();
            this.setScale();
            this.setTarget();
            this._addObject3d(this.object3d);
            this.slotIn();
            this.onReady();
            this.render();
        },
        // 根据vue组件递归查询scene节点
        _recursion(parent) {
            if (parent.$options.name === 'Vue3d') { // 当前挂载于Vue3D 根节点
                this.scene = parent.activated_scene();
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
        // 插槽中添加三维对象
        _addObject3d(object3d) {
            if (this.inTree) {
                this.addObject3d(object3d, true);
            } else {
                this.addObject3d(object3d, false);
            }
        },
        // 插槽中移除三位对象
        _removeObject3d(object3d) {
            this.removeObject3d(object3d, true);
        },
        setPosition() {
            this.object3d.position.set(this.position.x, this.position.y, this.position.z);
            this.render();
        },
        setRotation() {
            this.object3d.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
            this.render();
        },
        setScale() {
            this.object3d.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.render();
        },
        setTarget() {
            this.object3d.lookAt(this.target.x, this.target.y, this.target.z);
        },
        addObject3d(object3d, inNode) {
            if (inNode && this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.add(object3d);
            } else {
                this.scene.add(object3d);
            }
        },
        removeObject3d(object3d, inNode) {
            if (inNode && this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.remove(object3d);
            } else {
                this.removeObject3d(object3d);
            }
            this.vue3d.off("update", this.onRender);
        },
        // 激活插槽
        slotIn() {
            this.slot = true;
        },
        // 屏蔽插槽
        slotOut() {
            this.slot = false;
        },
        // 渲染
        render() {
            this.vue3d.render();
        },
        onReady() {
            this.$emit('ready', this.object3d);
        },
        onRender() {
            this.$emit('update', this.object3d);
        },
        onDestroy() {
            this.$emit('remove', this.object3d);
        }
    },
    watch: {
        name(val, oldVal) {
            if (val === oldVal) return;
            this.object3d.name = val;
        },
        "position.x"(val, oldVal) {
            if (val === oldVal) return;
            this.setPosition();
        },
        "position.y"(val, oldVal) {
            if (val === oldVal) return;
            this.setPosition();
        },
        "position.z"(val, oldVal) {
            if (val === oldVal) return;
            this.setPosition();
        },
        "rotation.x"(val, oldVal) {
            if (val === oldVal) return;
            this.setRotation();
        },
        "rotation.y"(val, oldVal) {
            if (val === oldVal) return;
            this.setRotation();
        },
        "rotation.z"(val, oldVal) {
            if (val === oldVal) return;
            this.setRotation();
        },
        "scale.x"(val, oldVal) {
            if (val === oldVal) return;
            this.setScale();
        },
        "scale.y"(val, oldVal) {
            if (val === oldVal) return;
            this.setScale();
        },
        "scale.z"(val, oldVal) {
            if (val === oldVal) return;
            this.setScale();
        },
        "target.x"(val, oldVal) {
            if (val === oldVal) return;
            this.setTarget();
        },
        "target.y"(val, oldVal) {
            if (val === oldVal) return;
            this.setTarget();
        },
        "target.z"(val, oldVal) {
            if (val === oldVal) return;
            this.setTarget();
        },
    },
}
