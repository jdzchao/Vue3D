import {Vector3} from "three";

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
            V$keyPoint: 'object3d', // 挂载检测点
            V$autoSlot: true, // 自动挂载到当前节点
            active: true, // 是否激活组件
            name: "", // 组件名称
            object3d: null, // 当前三维对象
            parent: null, // 父级三维对象
            root: null, // 根场景
            slot: false, // 是否挂载子节点
        }
    },
    watch: {
        "position.x"(val) {
            this.V$setPosition();
        },
        "position.y"(val) {
            this.V$setPosition();
        },
        "position.z"(val) {
            this.V$setPosition();
        },
        "rotation.x"(val) {
            this.V$setRotation();
        },
        "rotation.y"(val) {
            this.V$setRotation();
        },
        "rotation.z"(val) {
            this.V$setRotation();
        },
        "scale.x"(val) {
            this.V$setScale();
        },
        "scale.y"(val) {
            this.V$setScale();
        },
        "scale.z"(val) {
            this.V$setScale();
        },
        "target.x"(val) {
            this.V$setTarget();
        },
        "target.y"(val) {
            this.V$setTarget();
        },
        "target.z"(val) {
            this.V$setTarget();
        },
    },
    methods: {
        // 根据vue组件递归查询scene节点
        V$recursion(obj) {
            if (obj.hasOwnProperty('scene') && obj.hasOwnProperty('camera')) {
                this.root = obj;
                this.parent = obj;
            } else if (obj.hasOwnProperty('root') && obj.hasOwnProperty('object3d')) {
                this.root = obj.root;
                this.parent = obj;
            } else {
                this.recursion(obj.$parent);
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
                this.root.scene.add(object3d);
            }
            this.root.rendererDelegationAdd(this.onRender);
        },
        removeObject3d(object3d, inNode) {
            if (inNode && this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.remove(object3d);
            } else {
                this.removeObject3d(object3d);
            }
            this.root.rendererDelegationRemove(this.onRender);
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
            if (this.root) {
                this.root.render()
            }
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
        if (!this.root || !this.parent) {
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
    }
}
