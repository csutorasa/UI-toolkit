const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'wizyx.umd': path.join(__dirname, './index.ts')
    },
    output: {
        path: __dirname,
        filename: path.join('bundles', '[name].js'),
        library: 'wizyx',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    externals : {
        "@angular/common": {
            commonjs: '@angular/common',
            commonjs2: '@angular/common',
            amd: '@angular/common'
        },
        "@angular/compiler": {
            commonjs: '@angular/compiler',
            commonjs2: '@angular/compiler',
            amd: '@angular/compiler'
        },
        "@angular/core": {
            commonjs: '@angular/core',
            commonjs2: '@angular/core',
            amd: '@angular/core'
        },
        "@angular/forms": {
            commonjs: '@angular/forms',
            commonjs2: '@angular/forms',
            amd: '@angular/forms'
        },
        "@angular/http": {
            commonjs: '@angular/http',
            commonjs2: '@angular/http',
            amd: '@angular/http'
        },
        "@angular/platform-browser": {
            commonjs: '@angular/platform-browser',
            commonjs2: '@angular/platform-browser',
            amd: '@angular/platform-browser'
        },
        "@angular/platform-browser-dynamic": {
            commonjs: '@angular/platform-browser-dynamic',
            commonjs2: '@angular/platform-browser-dynamic',
            amd: '@angular/platform-browser-dynamic'
        },
        "@angular/router": {
            commonjs: '@angular/router',
            commonjs2: '@angular/router',
            amd: '@angular/router'
        },
        "rxjs/Rx": {
            commonjs: 'rxjs/Rx',
            commonjs2: 'rxjs/Rx',
            amd: 'rxjs/Rx'
        }
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        })*/
    ],
    watchOptions: {
        ignored: /node_modules/
    }
};