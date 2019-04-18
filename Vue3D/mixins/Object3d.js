export default {
    name: "Object3d",
    props: {
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
        }
    },
    data() {
        return {
            V$autoSlot: true, // 自动挂载到当前节点
            active: true, // 是否激活组件
            name: "", // 组件名称
            scene: null, // mounted scene
            object3d: null, // 当前三维对象
            parent: null, // 父级三维对象
            slot: false, // 是否挂载子节点
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
    methods: {
        // 根据vue组件递归查询scene节点
        V$recursion(obj) {
            if (!obj.hasOwnProperty("$parent")) {
                console.error("V3d-components must slot in Vue3d component");
                return;
            }
            if (obj.hasOwnProperty('V$scene')) {
                this.scene = obj.V$scene;
                this.renderer = obj.renderer;
                this.parent = obj;
            } else if (obj.hasOwnProperty("scene") && obj.hasOwnProperty('object3d')) {
                this.scene = obj.scene;
                this.renderer = obj.renderer;
                this.parent = obj;
            } else {
                this.V$recursion(obj.$parent);
            }
        },
        // 插槽中添加三维对象
        V$addObject3d(object3d) {
            if (this.V$autoSlot) {
                this.addObject3d(object3d, true);
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
            this.renderer.$on("update", this.onRender);
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
    created() {
        if (!this.parent) {
            this.V$recursion(this.$parent)
        }
    },
    /**
     * 所有mixins需要在mounted之前创建Object3d对象
     */
    mounted() {
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
    },
    destroyed() {
        this.slotOut();
        this.V$removeObject3d(this.object3d);
    },
    render() {
        this.renderer.render();
    }
}
