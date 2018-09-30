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
}