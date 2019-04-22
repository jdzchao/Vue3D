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
            this.info("Vue3D Start", renderer);
        },
        // renderer render
        render(renderer) {
            this.info("Vue3D Render", renderer);
        },
        // 读取配置文件
        loadConf(conf) {
            if (typeof conf !== 'object') return;
            this.config = Object.assign(this.config, conf);
        }
    },
    created() {
        /** 监听总线事件 **/
        this.$on('start', this.start);
        this.$on('render', this.render);
    }
};

export default new Vue(bus);
