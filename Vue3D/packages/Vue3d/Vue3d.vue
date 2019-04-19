<template>
    <canvas :id="id">
        Sorry, your web browser does not support WebGL
        <template v-if="slot">
            <grid-helper v-bind="config.grid" v-if="plugins.grid"></grid-helper>
            <box-helper v-bind="config.box" v-if="plugins.box"></box-helper>
            <slot></slot>
        </template>
    </canvas>
</template>

<script>
    import Renderer from "../../renderer";
    import GridHelper from "./Plugins/GridHelper"
    import BoxHelper from "./Plugins/BoxHelper"
    import Config from "../../config" // 默认推荐配置

    export default {
        name: "vue-3d",
        components: {
            GridHelper,
            BoxHelper
        },
        props: {
            id: {type: String, default: 'Vue3D'},
            width: {type: Number, default: 500},
            height: {type: Number, default: 500},
            ratio: {type: Number, default: 0},

            // Vue3d Configs Object
            config: {
                type: Object, default() {
                    return Config
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
                V$scene: null, // Base Scene
                V$camera: null, // Base Camera
                /* public */
                scene: null, // standard scene
                cameras: [], // Camera Array
                renderer: null,
                /* status */
                slot: false,
            }
        },
        mounted() {
            this.V$dom = this.$el;
            this.renderer = new Renderer();
            /* renderer config */
            let renderConf = this.config.hasOwnProperty('renderer') ? this.config['renderer'] : {};
            this.renderer.init(this.id, this.$el, renderConf, (res) => {
                this.V$scene = res._$scene;
                this.V$camera = res._$camera;
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
