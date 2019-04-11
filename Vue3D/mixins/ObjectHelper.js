export default {
    name: "ObjectHelper",
    data() {
        return {
            active: false,
            parent: null, // 挂载的父节点
            root: null,
            keyPoint: "object3d" // 设置挂载检测点
        }
    },
    created() {
        if (!this.parent) {
            this.checkParent(this.$parent)
        }
    },
    methods: {
        checkParent(obj) {
            if (obj.hasOwnProperty('object3d') && obj.hasOwnProperty(this.keyPoint)) {
                this.parent = obj;
                this.root = obj.root;
                this.active = true;
            } else {
                console.error(this.$options.name + " should slot on " + this.keyPoint + " node");
            }
        },
    }
}
