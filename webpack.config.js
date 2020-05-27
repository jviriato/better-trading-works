var path = require('path');
var webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    entry: './content.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'content.bundle.js'
    },
    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'pt-BR'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }

};
