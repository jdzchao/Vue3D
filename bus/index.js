import Vue from 'vue'
/** 组件 **/
import debug from './debug'
import delegation from './delegation'
import event from './event'
import utils from './utils'
import materials from './materials'

const bus = {
    mixins: [debug, delegation, event, utils, materials],
    data: {
        // 配置文件
        config: {
            debug: true, // Debug Mode
            helper: true, // Three.js Helper
        },
    },
    methods: {
        /**
         * 设置配置文件
         * @param conf
         */
        setConf(conf) {
            if (typeof conf === 'object') {
                this.config = Object.assign(this.config, conf)
            }
            return this.config
        }
    },
}

export default new Vue(bus)
