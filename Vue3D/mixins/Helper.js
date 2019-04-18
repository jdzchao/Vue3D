export default {
    name: "Helper",
    data() {
        return {
            // Vue3d Base
            V$dom: null,
            V$scene: null,
            V$camera: null,
            // Renderer
            renderer: null,
            // Helper
            active: true,
            plugin: null,
        }
    },
    watch: {
        active(val, oldVal) {
            if (val === oldVal) return;
            this.setActive(val);
        }
    },
    created() {
        if (this.$parent.hasOwnProperty('V$scene')) {
            this.V$dom = this.$parent.V$dom;
            this.V$scene = this.$parent.V$scene;
            this.V$camera = this.$parent.V$camera;
            this.renderer = this.$parent.renderer;
        } else {
            console.error(this.$options.name + " should slot on Vue3D Component");
        }
    },
    beforeMount() {
        if (this.plugin) {
            this.setActive(this.active);
        }
    },
    methods: {
        setActive(active) {
            if (active) {
                this.V$scene.add(this.plugin);
            } else {
                this.V$scene.remove(this.plugin);
            }
        },
        render() {
            this.renderer.render();
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
