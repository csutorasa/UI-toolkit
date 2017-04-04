const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './uitoolkit/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'target'),
        filename: '[name].bundle.js',
        library: 'uitoolkit',
        libraryTarget: 'umd'
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.js', '.ts']
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    plugins: [

        /*new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        })*/
    ]
};