/**
 * 总线事件委托
 */
export default {
    methods: {
        // 触发事件
        emit(event, ...args) {
            this.$emit(event, ...args)
        },
        // 监听事件
        on(event, callback) {
            this.$on(event, callback)
        },
        // 取消监听
        off(event, callback) {
            this.$off(event, callback)
        },
        // 单次监听事件
        once(event, callback) {
            this.$once(event, callback)
        },
    }
}
