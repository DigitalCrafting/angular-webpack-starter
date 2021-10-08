var webpack = require('webpack');
var helpers = require('../../helpers');
const { merge } = require('webpack-merge');
var htmlWebpackPlugin = require('html-webpack-plugin');
var miniCssExtractPlugin = require('mini-css-extract-plugin');
var commonConfig = require('./fea-webpack.common');
var aotPlugin = require('@ngtools/webpack').AngularWebpackPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = merge(commonConfig, {
    mode: 'production',

    output: {
        path: helpers.root('dist/dist-fea/'),
        publicPath: '', // path to public on server
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts|\.d\.ts)$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.scss$/,
                include: [
                    helpers.root('projects/first-example-app/src')
                ],
                use: [
                    'raw-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                './assets/scss/_vars.scss',
                                './assets/scss/_mixins.scss'
                            ]
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        emitOnErrors: false
    },

    plugins: [
        new htmlWebpackPlugin({
            template: helpers.root('projects/first-example-app/src/index.html'),
            base_path: '' // your application base path from production url
        }),
        new aotPlugin({
            tsconfig: 'projects/first-example-app/tsconfig.app.json',
            entryModule: 'projects/first-example-app/src/app/app.module#AppModule'
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
                // and app on that server is http://www.example.com/first-example-app/
                // the both this values will be /first-example-app/
                'API_URL': JSON.stringify(''),
                'PUBLIC_URL': JSON.stringify('')
            }
        }),
    ]
});
