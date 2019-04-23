import Vue from 'vue'
import config from './_config' // 加载默认配置
/** 组件 **/
import debug from './debug'
import delegation from './delegation'
import event from './event'

const bus = {
    mixins: [debug, delegation, event],
    data: {
        config: config, // 配置文件
    },
    methods: {
        // renderer start
        start(renderer) {
            this.warn("Vue3D 'start' event:", {renderer});
        },
        // renderer render
        render(renderer) {
            this.warn("Vue3D 'render' event:", {renderer});
        },
        // capture object
        capture(renderer, target) {
            this.warn("Vue3D 'capture' event:", {renderer, target})
        },
        // 读取配置文件
        loadConf(conf) {
            if (typeof conf !== 'object') return;
            this.config = Object.assign(this.config, conf);
        }
    },
    created() {
        /** 监听总线事件 **/
        if (this.config.debug) {
            this.$on('start', this.start);
            this.$on('render', this.render);
            this.$on('capture', this.capture);
        }
    }
};

export default new Vue(bus);
