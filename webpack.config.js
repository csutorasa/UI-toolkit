const path = require('path');
const webpack = require('webpack');

const toolkitFile = path.join(__dirname, 'uitoolkit', 'bundles', 'uitoolkit.umd.min.js');

module.exports = {
    entry: {
        'showcase': path.join(__dirname, 'showcase', 'src', './main.ts')
    },
    output: {
        path: path.join(__dirname, 'showcase', 'bundles'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'uitoolkit': toolkitFile,
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
        new webpack.ContextReplacementPlugin(
            /@angular/,
            path.join(__dirname, 'showcase', 'src')
        )
    ],
    watchOptions: {
        ignored: /node_modules/
    }
};