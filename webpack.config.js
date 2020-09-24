﻿const path = require('path');
const webpack = require('webpack');

module.exports = (env, args) => ({
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: args.mode === 'development' ? 'inline-source-map' : 'none',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader'
            }
        ]
    },
    entry: {
        "main": './typescript/main.ts'
    },
    output: {
        path: path.join(__dirname, '/wwwroot/scripts'),
        filename: '[name].js'
    }
});