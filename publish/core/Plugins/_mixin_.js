export default {
    name: "Plugin",
    data() {
        return {
            // Vue3D Base
            $_canvas: null,
            $_scene: null,
            $_camera: null,
            // Vue3D Activate
            vue3d: null, // renderer
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
            this.vue3d.render();
        }
    },
    created() {
        let vue3d = this.$parent.vue3d && this.$parent.vue3d();
        if (vue3d) {
            this.$data.$_canvas = vue3d.$_canvas;
            this.$data.$_scene = vue3d.$_scene;
            this.$data.$_camera = vue3d.$_camera;
            this.vue3d = this.$parent;
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
