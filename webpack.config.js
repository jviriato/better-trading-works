var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './background.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'background.bundle.js'
    },
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