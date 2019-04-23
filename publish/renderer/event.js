import Bus from '../bus'

/**
 * 总线事件
 */
export default {
    methods: {
        // 触发事件 => $emit
        emit(event, ...args) {
            this.$emit(event, ...args);
            Bus.$emit(event, this, ...args); // 增加Bus事件监听
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
    }
}
