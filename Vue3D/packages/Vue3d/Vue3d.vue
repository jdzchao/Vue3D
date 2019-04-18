<template>
    <canvas :id="id">
        Sorry, your web browser does not support WebGL
        <template v-if="slot">
            <grid-helper v-if="plugins.grid"></grid-helper>
            <slot></slot>
        </template>
    </canvas>
</template>

<script>
    import Renderer from "../../renderer";
    import GridHelper from "./Plugins/GridHelper"

    export default {
        name: "vue-3d",
        components: {
            GridHelper
        },
        props: {
            id: {type: String, default: 'Vue3D'},
            width: {type: Number, default: 500},
            height: {type: Number, default: 500},
            ratio: {type: Number, default: 0},

            // renderer parameters
            params: {
                type: Object, default() {
                    return {}
                }
            },

            // helper components
            plugins: {
                type: Object, default() {
                    return {
                        grid: false,
                    }
                }
            }
        },
        data() {
            return {
                /* protected */
                V$dom: null,
                V$scene: null, // root scene
                V$cameras: null, // Array Camera
                V$camera: null, // Active Camera
                /* public */
                scene: null, // standard scene
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
            });
            // this.renderer.setSize(this.width, this.height);
            // this.renderer.setPixelRatio(this.ratio);
            // this.renderer.refresh();
        },
        watch: {
            width(val, oldVal) {
                if (val === oldVal) return;
                this.renderer.setSize(this.width, this.height, true);
            },
            height(val, oldVal) {
                if (val === oldVal) return;
                this.renderer.setSize(this.width, this.height, true);
            },
            ratio(val, oldVal) {
                if (val === oldVal) return;
                this.renderer.setPixelRatio(this.ratio, true);
            }
        }
    }
</script>
