'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = 'Vue3D' // page title
const port = 8000 // dev port
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
    },

    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src'),
                '@v3d': path.resolve(__dirname, 'publish')
            }
        }
    },

}
