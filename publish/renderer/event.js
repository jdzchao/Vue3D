import editor from '../bus'

/**
 * 总线事件
 */
export default {
    methods: {
        // 触发事件 => $emit
        emit(event, ...args) {
            editor.emit(event, ...args);
            this.$emit(event, ...args);
        },
        // 监听事件  => $on
        on(event, callback) {
            editor.on(event, callback);
            this.$on(event, callback);
        },
        // 取消监听  => $off
        off(event, callback) {
            editor.off(event, callback);
            this.$off(event, callback);
        },
        // 单次监听事件  => $once
        once(event, callback) {
            editor.once(event, callback);
            this.$once(event, callback);
        },
    }
}
