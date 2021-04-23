/**
 * 调试器
 */
export default {
    methods: {
        log(...args) {
            if (!this.config.debug) return;
            console.log(...args);
        },
        info(...args) {
            if (!this.config.debug) return;
            console.info(...args);
        },
        warn(...args) {
            if (!this.config.debug) return;
            console.warn(...args);
        },
        error(...args) {
            if (!this.config.debug) return;
            console.error(...args);
        }
    }
}
