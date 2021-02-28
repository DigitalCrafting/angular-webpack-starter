const helpers = require('../helpers');
const webpack = require('webpack');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        main: helpers.root('projects/unit-tests.ts')
    },
    output: {
        path: helpers.root('dist/out-test/'),
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.js', '.html'],
        plugins: [
            new tsconfigPathsPlugin({
                configFile: helpers.root('./tsconfig.spec.json')
            })
        ]
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    helpers.root('node_modules/@angular')
                ]
            },
            {
                test: /\.ts$/,
                include: [
                    helpers.root('projects/')
                ],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                include: [
                    helpers.root('projects/')
                ],
                exclude: [
                    helpers.root('projects/first-example-app/src/index.html'),
                    helpers.root('projects/second-example-app/src/index.html')
                ],
                loader: 'html-loader'
            },
            {
                test: /index\.html/,
                include: [
                    helpers.root('projects/first-example-app/src/index.html'),
                    helpers.root('projects/second-example-app/src/index.html')
                ],
                loader: 'blueimp-tmpl-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|tf|eot|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "./assets/[name].[hash].[ext]"
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                include: [
                    helpers.root('projects/')
                ],
                use: [
                    'to-string-loader',
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
            },
            {
                test: /\.css$/,
                exclude: [
                    helpers.root('projects/')
                ],
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.css$/,
                include: [
                    helpers.root('projects/')
                ],
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: helpers.root('projects/first-example-app/src/index.html'),
            base_path: '',
            filename: "index.html",
            showErrors: true,
            title: "Webpack App",
            path: helpers.root('dist/'),
            hash: true
        }),
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)f?esm5/, helpers.root('projects/')
        )
    ],
    performance: {
        hints: false
    }
};
