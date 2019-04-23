import Bus from './index'

/**
 * 事件委托
 */
export default {
    data() {
        return {
            _$delegation: [],
        }
    },
    methods: {
        // 向委托中添加方法
        delegationAdd(func) {
            if (typeof func === 'function') {
                this.$data._$delegation.push(func);
            } else {
                Bus.error('Render delegation need a function');
            }
        },
        // 从委托中移除方法
        delegationRemove(func) {
            let index = this.$data._$delegation.indexOf(func);
            if (index >= 0) {
                this.$data._$delegation.slice(index, 1);
            } else {
                Bus.warn('Function is not found in render delegation');
            }
        },
        // 执行委托
        delegationCall(renderer) {
            this.$data._$delegation.forEach((func) => {
                func(renderer);
            });
        }
    }
}
