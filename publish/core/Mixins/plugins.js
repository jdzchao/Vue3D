/**
 * 插件路由
 */
import Capture from "../Libraries/capture"

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
                this.$data.$_canvas,
                this.$data.$_camera,
                this.scenes, // 场景管理器
                (object3d) => {
                    this.emit('capture', object3d)
                }
            );
        })
    },
}
