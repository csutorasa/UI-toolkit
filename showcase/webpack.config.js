const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const alias = {};
const filename = path.join('wizyx', 'bundles', 'wizyx.umd.min.js');
//const filename = path.join('wizyx', 'index.ts');
try {
    const innerDevFilename = path.join(__dirname, '..', filename);
    fs.statSync(innerDevFilename);
    alias['wizyx'] = innerDevFilename;
    console.log('Using workspace wizyx libary!');
}
catch(ex) {
    // file not found
    // package will be used if found
    alias['wizyx'] = filename;
    console.log('Using node_modules wizyx libary!');
}

module.exports = {
    entry: {
        'showcase': path.join(__dirname, 'src', './main.ts')
    },
    output: {
        path: path.join(__dirname, 'bundles'),
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
            path.join(__dirname, 'src')
        )
    ],
    watchOptions: {
        ignored: /node_modules/
    }
};