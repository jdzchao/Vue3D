import Vue from 'vue'
import config from './config'
import event from './event'

const editor = {
    mixins: [event],
    data: {
        config: config, // 配置文件
    },
    methods: {},
};

/**
 * 编辑器总线
 */
export default new Vue(editor);
