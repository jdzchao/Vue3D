/**
 * 总线事件
 */
export default {
    methods: {
        // 触发事件 => $emit
        emit(event, ...args) {
            this.$emit(event, ...args);
        },
        // 监听事件  => $on
        on(event, callback) {
            this.$on(event, callback);
        },
        // 取消监听  => $off
        off(event, callback) {
            this.$off(event, callback);
        },
        // 单次监听事件  => $once
        once(event, callback) {
            this.$once(event, callback);
        },
        /****************************************
         * Event Callback for Debug
         ****************************************/
        // renderer start
        event_start(renderer) {
            this.warn("Vue3D 'start' event:", {renderer});
        },
        // renderer render
        event_render(renderer) {
            this.warn("Vue3D 'render' event:", {renderer});
        },
        // capture object
        event_capture(renderer, target) {
            this.warn("Vue3D 'capture' event:", {renderer, target})
        },
    },
    created() {
        /** 监听总线事件 **/
        if (this.config.debug) {
            this.$on('start', this.event_start);
            this.$on('render', this.event_render);
            this.$on('capture', this.event_capture);
        }
    },
}
