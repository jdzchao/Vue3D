const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            _c: path.resolve(__dirname, 'src/components'),
            _v3d: path.resolve(__dirname, 'Vue3D')
        }
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('src/assets/icon-svg')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                exclude: [resolve('src/assets/icon-svg')],
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
            }
        ]
    }
};
