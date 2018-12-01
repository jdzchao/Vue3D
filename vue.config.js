// 为了编辑器代码提示，将webpack的部分配置单独来写。
const webpack = require('./webpack.config.js')
module.exports = {
    baseUrl: '/',

    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8000,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {
        }
    },

    configureWebpack: webpack,

    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
    }
}