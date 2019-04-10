export default {
    name: "Object3d",
    props: {},
    data() {
        return {
            _keyPoint: 'object3d',
            active: true, // 是否激活组件
            name: "", // 组件名称
            object3d: null, // 当前三维对象
            parent: null, // 父级三维对象
            root: null, // 根场景
            slot: false, // 是否挂载子节点
            transform: {
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: {x: 1, y: 1, z: 1}
            }
        }
    },
    methods: {
        // 根据vue组件递归查询scene节点
        recursion(obj) {
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
        // 添加三维对象
        addObject3d(object3d) {
            if (this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.add(object3d);
            } else {
                this.root.scene.add(object3d);
            }
            this.root.rendererDelegationAdd(this.onRender);
        },
        // 移除三位对象
        removeObject3d(object3d) {
            if (this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.remove(object3d);
            } else {
                this.root.scene.remove(object3d);
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
            this.recursion(this.$parent)
        }
    },
    /**
     * 所有mixins需要在mounted之前创建Object3d对象
     */
    mounted() {
        this.addObject3d(this.object3d);
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
        this.removeObject3d(this.object3d);
    }
}
