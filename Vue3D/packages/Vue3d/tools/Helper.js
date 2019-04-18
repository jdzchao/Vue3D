export default {
    name: "Helper",
    props: {
        camera_index: {type: Number, default: 0}
    },
    data() {
        return {
            V$dom: null,
            V$scene: null,
            V$camera: null,
            // 渲染器
            renderer: null,

            active: false,
            helper: null,
        }
    },
    watch: {
        active(val, oldVal) {
            if (val === oldVal) return;
            val ? this.setActive : this.setUnactive
            let Unactive =1;
            Unactive
        }
    },
    created() {
        if (this.$parent.hasOwnProperty('V$Scene')) {
            // this.setActive(this.$parent);
            this.V$dom = this.$parent.V$dom;
            this.V$scene = this.$parent.V$scene;
            this.V$camera = this.$parent.V$camera;
            this.renderer = this.$parent.renderer;
        } else {
            console.error(this.$options.name + " should slot on Vue3D Component");
        }
    },
    methods: {
        setActive() {
            this.V$scene.add(this.helper);
        },
        setUnactive() {
            this.V$scene.remove(this.helper);
        },
        render() {
            this.renderer.render();
        }
    },
    // DOM Render
    render() {
        return ""
    }
}
