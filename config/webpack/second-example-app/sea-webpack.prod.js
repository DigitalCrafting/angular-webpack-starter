var webpack = require('webpack');
var helpers = require('../../helpers');
const { merge } = require('webpack-merge');
var htmlWebpackPlugin = require('html-webpack-plugin');
var miniCssExtractPlugin = require('mini-css-extract-plugin');
var commonConfig = require('./sea-webpack.common');
var aotPlugin = require('@ngtools/webpack').AngularWebpackPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = merge(commonConfig, {
    mode: 'production',

    output: {
        path: helpers.root('dist/dist-sea/public'),
        publicPath: '/public/', // path to public on server
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts|\.d\.ts)$/,
                loader: '@ngtools/webpack'
            }
        ]
    },
    optimization: {
        emitOnErrors: false
    },

    plugins: [
        new htmlWebpackPlugin({
            template: helpers.root('projects/second-example-app/src/index.html'),
            base_path: '' // your application base path from production url
        }),
        new aotPlugin({
            tsconfig: 'projects/second-example-app/tsconfig.app.json',
            entryModule: 'projects/second-example-app/src/app/app.module#AppModule'
        }),
        new miniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].chunk.css'
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                // API_URL and PUBLIC_URL should be the same, it should be base path to your application
                // in example: if your server url is http://www.example.com
                // and app on that server is http://www.example.com/second-example-app/
                // the both this values will be /second-example-app/
                'API_URL': JSON.stringify(''),
                'PUBLIC_URL': JSON.stringify('')
            }
        }),
    ]
});
