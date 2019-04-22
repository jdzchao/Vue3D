const webpack = require('./webpack.config.js')
module.exports = {
    publicPath: './',

    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8000,
        https: false,
        hotOnly: false,
        proxy: null,
        before: app => {
        }
    },

    configureWebpack: webpack,
}
