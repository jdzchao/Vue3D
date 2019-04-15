import Vue from 'vue'
import event from './event'
import delegation from './delegation'

const Bus = new Vue({
    mixins: [event, delegation],
    data: {
        auto: false, // 自动渲染
        status: 0, // 渲染状态 0:awake; 1:start; 2:render;
        pause: false,
        pure: false, // 是否仅渲染 hierarchy scene
        renderTick: null
    },
    methods: {
        start() {
            this.status = 1;
        },
        render() {
            if (this.renderTick && this.pause) return;
            this.status = 2;
            this.renderTick = requestAnimationFrame(() => {
                this.delegationCall();
                this.$emit("update");
                this.renderTick = null;
                if (this.auto) {
                    this.render();
                }
            })
        },
        setPause() {
            this.pause = !this.pause;
        }
    }
});
export default Bus
