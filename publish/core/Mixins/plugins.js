import Capture from "../Plugins/capture"

/**
 * 插件路由
 */
export default {
    data() {
        return {
            capture: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            // 初始化 Capture
            this.capture = new Capture(
                this.canvas,
                this.camera,
                this.scenes, // 场景管理器
                (object3d) => {
                    this.emit('capture', object3d)
                }
            );
        })
    },
}
