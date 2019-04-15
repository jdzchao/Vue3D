/**
 * 总线事件委托
 */
export default {
    methods: {
        /* 事件代理 */
        emit(event, ...args) {
            this.$emit(event, ...args)
        },
        on(event, callback) {
            this.$on(event, callback)
        },
        off(event, callback) {
            this.$off(event, callback)
        },
        once(event, callback) {
            this.$once(event, callback)
        },
    }
}
