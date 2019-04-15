/**
 * 事件委托
 */
export default {
    data() {
        return {
            delegation: [],
        }
    },
    methods: {
        // 向委托中添加方法
        delegationAdd(func) {
            if (typeof func === 'function') {
                this.delegation.push(func);
            } else {
                console.error('error type function');
            }
        },
        // 从委托中移除方法
        delegationRemove(func) {
            let index = this.delegation.indexOf(func);
            if (index >= 0) {
                this.delegation.slice(index, 1);
            } else {
                console.warn('function is not found in the delegation');
            }
        },
        // 执行委托
        delegationCall() {
            this.delegation.forEach((func) => {
                func();
            });
        }
    }
}
