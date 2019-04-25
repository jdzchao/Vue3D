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
        manager: {}, // Vue3D 实例管理器
    },
    methods: {
        /**
         * 加载配置文件
         * @param conf
         */
        loadConf(conf) {
            if (typeof conf !== 'object') return;
            this.config = Object.assign(this.config, conf);
        },
        /**
         * 添加vue3d实例
         * @param id
         * @param vue3d
         */
        managerAdd(id, vue3d) {
            this.manager[id] = vue3d;
        },
        /**
         * 移除vue3d实例
         * @param id
         */
        managerRemove(id) {
            delete this.manager[id];
        }
    },
};

export default new Vue(bus);
