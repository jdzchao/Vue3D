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
    },
    data() {
        return {
            visible: true, // 是否可见
            scene: null, // mounted scene
            object3d: null, // 当前三维对象
            parent: null, // 父级三维对象
            slot: false, // 是否挂载子节点
        }
    },
    created() {
        // check Vue component parent
        if (!this.$parent) {
            console.error(this.$options.name + " must slot in Vue3D-Component");
            return;
        }
        // check Vue3D component parent
        if (!this.parent) {
            this.V$recursion(this.$parent)
        }
    },
    mounted() {
        this.renderer.$on("update", this.onRender);
        this.V$setPosition();
        this.V$setRotation();
        this.V$setScale();
        this.V$setTarget();
        this.V$addObject3d(this.object3d);
        this.slotIn();
        this.onReady();
        this.render();
    },
    updated() {
        this.render();
    },
    beforeDestroy() {
        this.onDestroy();
        this.slotOut();
        this.V$removeObject3d(this.object3d);
    },
    methods: {
        // 根据vue组件递归查询scene节点
        V$recursion(parent) {
            if (parent.$options.name === 'vue-3d' || parent.$options.name === 'V3dScene') {
                this.scene = parent.scene;
                this.renderer = parent.renderer;
                this.parent = parent;
            } else if (parent.hasOwnProperty("scene") && parent.hasOwnProperty('object3d')) {
                this.scene = parent.scene;
                this.renderer = parent.renderer;
                this.parent = parent;
            } else {
                this.V$recursion(parent.$parent);
            }
        },
        // 插槽中添加三维对象
        V$addObject3d(object3d) {
            if (this.inTree) {
                this.addObject3d(object3d, true);
            } else {
                this.addObject3d(object3d, false);
            }
        },
        // 插槽中移除三位对象
        V$removeObject3d(object3d) {
            this.removeObject3d(object3d, true);
        },
        V$setPosition() {
            this.object3d.position.set(this.position.x, this.position.y, this.position.z);
            this.render();
        },
        V$setRotation() {
            this.object3d.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
            this.render();
        },
        V$setScale() {
            this.object3d.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.render();
        },
        V$setTarget() {
            this.object3d.lookAt(this.target.x, this.target.y, this.target.z);
        },
        addObject3d(object3d, inNode) {
            if (inNode && this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.add(object3d);
            } else {
                this.scene.add(object3d);
            }
            // this.root.rendererDelegationAdd(this.onRender);
        },
        removeObject3d(object3d, inNode) {
            if (inNode && this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.remove(object3d);
            } else {
                this.removeObject3d(object3d);
            }
            this.renderer.$off("update", this.onRender);
            // this.root.rendererDelegationRemove(this.onRender);
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
            this.renderer.render();
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
        "position.x"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setPosition();
        },
        "position.y"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setPosition();
        },
        "position.z"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setPosition();
        },
        "rotation.x"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setRotation();
        },
        "rotation.y"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setRotation();
        },
        "rotation.z"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setRotation();
        },
        "scale.x"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setScale();
        },
        "scale.y"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setScale();
        },
        "scale.z"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setScale();
        },
        "target.x"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setTarget();
        },
        "target.y"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setTarget();
        },
        "target.z"(val, oldVal) {
            if (val === oldVal) return;
            this.V$setTarget();
        },
    },
}
