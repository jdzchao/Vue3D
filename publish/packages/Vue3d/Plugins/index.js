export default {
    name: "Plugin",
    props: {
        active: {type: Boolean, default: true}
    },
    data() {
        return {
            // Vue3D Base
            $_canvas: null,
            $_scene: null,
            $_camera: null,
            // Vue3D Activate
            renderer: null, // renderer
            plugin: null, // handler
        }
    },
    watch: {
        active(val, oldVal) {
            if (val === oldVal) return;
            this.setActive(val);
        }
    },
    methods: {
        setActive(active) {
            if (active) {
                this.vue3d_add(this.plugin);
            } else {
                this.vue3d_remove(this.plugin);
            }
        },
        vue3d_add(obj) {
            this.$data.$_scene.add(obj);
        },
        vue3d_remove(obj) {
            this.$data.$_scene.add(obj);
        },
        render() {
            this.renderer.render();
        }
    },
    created() {
        let base = this.$parent.inherit_base && this.$parent.inherit_base();
        if (base) {
            this.$data.$_canvas = base.$_canvas;
            this.$data.$_scene = base.$_scene;
            this.$data.$_camera = base.$_camera;
            this.$data.$_renderer = base.renderer;
        } else {
            console.error(this.$options.name + " should slot on Vue3D Component");
        }
    },
    beforeMount() {
        if (this.plugin) {
            this.setActive(this.active);
        }
    },
    /**
     * Vue V-DOM Render
     * Helper不显示在页面元素中，返回一个空值
     * @returns {null} 返回且仅返回空值
     */
    render() {
        return null;
    }
}
