import Vue from 'vue'
import event from './event'

const editor = {
    mixins: [event],
    methods: {}
};

/**
 * 编辑器总线
 */
export default new Vue(editor);
