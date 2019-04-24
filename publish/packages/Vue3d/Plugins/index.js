export default {
    name: "Plugin",
    data() {
        return {
            // Vue3D Base
            $_canvas: null,
            $_scene: null,
            $_camera: null,
            // Vue3D Activate
            renderer: null, // renderer
            plugin: null, // Object3D plugin handler
        }
    },
    methods: {
        vue3d_add(obj) {
            this.$data.$_scene.add(obj);
            this.render();
        },
        vue3d_remove(obj) {
            this.$data.$_scene.remove(obj);
            this.render();
        },
        render() {
            this.renderer.render();
        }
    },
    created() {
        let base = this.$parent.fetch_base && this.$parent.fetch_base();
        if (base) {
            this.$data.$_canvas = base.$_canvas;
            this.$data.$_scene = base.$_scene;
            this.$data.$_camera = base.$_camera;
            this.renderer = base.renderer;
        } else {
            console.error(this.$options.name + " should slot on Vue3D Component");
        }
    },
    beforeMount() {
        if (this.plugin) {
            this.vue3d_add(this.plugin);
        }
    },
    beforeDestroy() {
        if (this.plugin) {
            this.vue3d_remove(this.plugin);
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
