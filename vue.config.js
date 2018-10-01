module.exports = {
    baseUrl: './',

    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.yml$/,
                    loaders: ['json-loader', 'yaml-loader']
                }
            ]
        }
    },

    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: true,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined
}