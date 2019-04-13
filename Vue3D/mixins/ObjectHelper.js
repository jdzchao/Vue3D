export default {
    name: "ObjectHelper",
    props: {
        camera_index: {type: Number, default: 0}
    },
    data() {
        return {
            active: false,
            root: null,
            scene: null,
            camera: null,
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
                this.scene = vnode.scene;
                this.camera = vnode.cameras[this.camera_index];
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
