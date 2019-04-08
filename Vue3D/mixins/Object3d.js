export default {
    name: "Object3d",
    props: {},
    data() {
        return {
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
        mount(obj) {
            console.log(obj)
            if (obj.hasOwnProperty('scene') && obj.hasOwnProperty('camera')) {
                this.root = obj;
                this.parent = obj;
            } else if (obj.hasOwnProperty('root') && obj.hasOwnProperty('object3d')) {
                this.root = obj.root;
                this.parent = obj;
            } else {
                this.mount(obj.$parent);
            }
        },
        slotIn() {
            this.slot = true;
        },
        slotOut() {
            this.slot = false;
        },
        addObject3d(object3d) {
            if (this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.add(object3d);
            } else {
                this.root.scene.add(object3d);
            }
        },
        removeObject3d(object3d) {
            if (this.parent.hasOwnProperty('object3d')) {
                this.parent.object3d.remove(object3d);
            } else {
                this.root.scene.remove(object3d);
            }
        },
        render() {
            if (this.root) {
                this.root.render()
            }
        }
    },
    created() {
        if (!this.root || !this.parent) {
            this.mount(this.$parent)
        }
    },
    mounted() {
        // console.log(this.object3d)
    },
    updated() {
        this.render();
    },
    destroyed() {
        this.removeObject3d(this.object3d);
    }
}
