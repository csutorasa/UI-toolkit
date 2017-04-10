const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const alias = {};
const filename = path.join('wizyx', 'bundles', 'wizyx.umd.min.js');
try {
    const innerDevFilename = path.join(__dirname, filename);
    fs.statSync(innerDevFilename);
    alias['wizyx'] = innerDevFilename;
}
catch(ex) {
    // file not found
    // package will be used if found
    alias['wizyx'] = filename;
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