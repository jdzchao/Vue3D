export default {
    name: "ObjectHelper",
    data() {
        return {
            active: false,
            root: null,
        }
    },
    created() {
        if (!this.root) {
            this.setActive(this.$parent);
        }
    },
    methods: {
        setActive(vnode) {
            if (vnode.hasOwnProperty('scene')) {
                this.root = vnode;
                this.active = true;
            } else {
                console.error(this.$options.name + " should slot on scene node");
            }
        },
    },
    render() {
        return null
    }
}
