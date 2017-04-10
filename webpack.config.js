const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const filePath = [__dirname, 'wizyx', 'bundles', 'wizyx.umd.min.js'];
const alias = {};

try {
    let filename = '';
    filePath.forEach(file => {
        filename = path.join(filename, file);
        fs.statSync(filename);
    });
    alias['wizyx'] = filename;
}
catch(ex) {
    // file not found
    // package will be used if found
}

module.exports = {
    entry: {
        'showcase': path.join(__dirname, 'showcase', 'src', './main.ts')
    },
    output: {
        path: path.join(__dirname, 'showcase', 'bundles'),
        filename: '[name].js'
    },
    resolve: {
        alias: alias,
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /@angular/,
            path.join(__dirname, 'showcase', 'src')
        )
    ],
    watchOptions: {
        ignored: /node_modules/
    }
};