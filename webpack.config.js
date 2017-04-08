const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'showcase.min': path.join(__dirname, 'showcase', 'src', './main.ts')
    },
    output: {
        path: path.join(__dirname, 'showcase', 'bundles'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'uitoolkit': path.join(__dirname, 'uitoolkit', 'bundles', 'uitoolkit.umd.js'),
            'rxjs/Rx': path.join(__dirname, 'node_modules', 'rxjs', 'Rx.js')
        },
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
        /*new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),*/
        new webpack.ContextReplacementPlugin(
            /@angular/,
            path.join(__dirname, 'showcase', 'src')
        )
    ]
};