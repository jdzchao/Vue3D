import Bus from './index'

/**
 * 事件委托
 */
export default {
    data() {
        return {
            $_delegation: [],
        }
    },
    methods: {
        /**
         * 向委托中添加方法
         * @param func
         */
        delegationAdd(func) {
            if (typeof func === 'function') {
                this.$data.$_delegation.push(func);
            } else {
                Bus.error('Render delegation need a function');
            }
        },
        /**
         * 从委托中移除方法
         * @param func
         */
        delegationRemove(func) {
            let index = this.$data.$_delegation.indexOf(func);
            if (index >= 0) {
                this.$data.$_delegation.slice(index, 1);
            } else {
                Bus.warn('Function is not found in render delegation');
            }
        },
        /**
         * 执行委托
         * @param renderer
         */
        delegationCall(renderer) {
            this.$data.$_delegation.forEach((func) => {
                func && func(renderer);
            });
        }
    }
}
