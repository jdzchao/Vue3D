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
         * Event Callback for example
         ****************************************/
        // renderer status
        event_status(renderer, status) {
            this.info("Vue3D 'status' event: ", {renderer, status})
        },
        // capture object
        event_capture(renderer, target) {
            this.info("Vue3D 'capture' event: ", {renderer, target})
        },
        // capture all objects
        event_capture_all(renderer, targets) {
            this.info("Vue3D 'capture_all' event: ", {renderer, targets})
        },
        // let renderer render
        event_render(renderer) {
            this.info("Vue3D 'render' event: ", renderer)
        },
        // let vue3d components update
        event_update(renderer){
            this.info("Vue3D 'update' event: ", renderer)
        }
    },
    created() {
        /** 监听总线事件 **/
        if (this.config.debug) {
            this.$on('status', this.event_status);
            this.$on('capture', this.event_capture);
            this.$on('capture_all', this.event_capture_all);
            this.$on('render', this.event_render);
            this.$on('update', this.event_update);
        }
    },
}
