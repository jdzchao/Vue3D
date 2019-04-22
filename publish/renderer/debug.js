/**
 * 调试器
 */
export default {
    data() {
        return {
            _$debug: true,
        }
    },
    methods: {
        log(...args) {
            if (!this.$data._$debug) return;
            console.log(...args);
        },
        info(...args) {
            if (!this.$data._$debug) return;
            console.info(...args);
        },
        error(...args) {
            if (!this.$data._$debug) return;
            console.error(...args);
        },
        warn(...args) {
            if (!this.$data._$debug) return;
            console.warn(...args);
        }
    }
}
