import Vue from 'vue'
import config from './_config' // 加载默认配置
/** 组件 **/
import debug from './debug'
import delegation from './delegation'
import event from './event'
import utils from './utils'

const bus = {
    mixins: [debug, delegation, event, utils],
    data: {
        config: config, // 配置文件
    },
    methods: {
        /**
         * 设置配置文件
         * @param conf
         */
        setConf(conf) {
            if (typeof conf === 'object') {
                this.config = Object.assign(this.config, conf);
            }
            return this.config;
        },
        /**
         * 读取配置文件
         * INFO: 读取的时候不会修改配置文件，但是可以传入对象合并配置信息并返回新配置。
         * @param conf
         */
        loadConf(conf) {
            if (typeof conf !== 'object') {
                return this.config;
            } else {
                return Object.assign({}, this.config, conf);
            }
        }
    },
};

export default new Vue(bus);
