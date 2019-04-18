<template>
    <canvas :id="id">
        Sorry, your web browser does not support WebGL
        <slot v-if="slot"></slot>
    </canvas>
</template>

<script>
    import Renderer from "../../renderer";

    export default {
        name: "vue-3d",
        props: {
            id: {type: String, default: 'Vue3D'},
            width: {type: Number, default: 50},
            height: {type: Number, default: 50},
            ratio: {type: Number, default: 1},

            clearColor: {type: String, default: 'rgb(25,25,25)'},
            clearAlpha: {type: Number, default: 1},

            // renderer parameters
            params: {
                type: Object, default() {
                    return {}
                }
            },
        },
        data() {
            return {
                /* protected */
                V$dom: null,
                V$scene: null, // root scene
                V$cameras: null, // Array Camera
                /* public */
                scenes: null, // standard scene
                cameras: [], // Camera Array
                renderer: null,
                /* status */
                slot: false,
            }
        },
        mounted() {
            this.renderer = new Renderer();
            this.params['id'] = this.id;
            this.params['canvas'] = this.$el; // 强制覆盖自定义的canvas参数
            this.renderer.init(this.params, (res) => {
                this.V$dom = res.canvas;
                this.V$scene = res._$scene;
                this.scene = res.scene;
                this.cameras = res.cameras;
                this.slot = true; // 开始挂载子组件
            }); // 初始化
            this.renderer.$on("reset-renderer", this.resetRenderer);
        },
        methods: {
            resetRenderer() {
                this.renderer.setSize(this.width, this.height);
                this.renderer.setPixelRatio(window.devicePixelRatio || this.ratio);
                this.renderer.setClearColor(this.clearColor, this.clearAlpha);
                this.renderer.render();
            },
        }
    }
</script>
