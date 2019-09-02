import Bus from '../../bus'
import Vue from 'vue'

/**
 * 总线事件
 * 在Vue3D组件中，区别于$emit,$on,$off,$once
 */
export default {
    data() {
        return {
            event: new Vue(), // 事件管理器
            statuses: ['awake', 'start', 'update'], // 生命周期状态集
            activity: null, // 当前生命周期
        }
    },
    methods: {
        // 触发事件 => $emit
        emit(event, ...args) {
            this.event.$emit(event, ...args);
            Bus.$emit(event, this, ...args); // 增加Bus事件监听
        },
        // 监听事件  => $on
        on(event, callback) {
            this.event.$on(event, callback);
        },
        // 取消监听  => $off
        off(event, callback) {
            this.event.$off(event, callback);
        },
        // 单次监听事件  => $once
        once(event, callback) {
            this.event.$once(event, callback);
        },
        // 生命周期状态监听
        lifecycle(status) {
            if (this.statuses.indexOf(status) >= 0) {
                this.activity = status;
                this.emit("lifecycle", status);
            }
        }
    }
}
