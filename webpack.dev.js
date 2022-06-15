//開発環境用


const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (env, options) => {
    if (env.id == undefined) return; //引数にidが指定されていなければ何もしない
    return {
        mode: 'development',
        devtool: 'source-map',
        target: ['web', 'es7'],
        // メインとなるJavaScriptファイル（エントリーポイント）
        entry: {
            maints: `./telops/${env.id}/main.ts`
        },
        output: {
            path: `${__dirname}/.dev`,
            filename: '[fullhash]/main.js'
        },
        module: {
            rules: [{
                    // 拡張子 .ts の場合
                    test: /\.ts$/,
                    // TypeScript をコンパイルする
                    use: 'ts-loader',
                },
                {
                    test: /telops.*\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'expanded',
                            },
                        },
                    }, ]
                },
                {
                    test: /\.ejs$/,
                    use: 'ejs-compiled-loader',
                },
                {
                    test: /\.(jpg|png|gif|ttf|otf|woff|woff2|mp4|json)$/,
                    type: "asset/inline"
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: `./index.html`,
                template: `./telops/${env.id}/index.ejs`,
                inject: "body",
                scriptLoading:""
            }),
            new MiniCssExtractPlugin({
                filename: '[fullhash]/style.css'
            }),
            new Dotenv({
                path: `.env_${process.env.NODE_ENV}`
            })
        ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
            ],
        },
        resolve: {
            // 拡張子を配列で指定
            extensions: [
                '.ts', '.js', '.scss', '.css',
            ],
            modules: [
                path.resolve('./'),
                path.resolve('./node_modules/'),
            ]
        },
        devServer: {
            compress: true,
            port: 3000,
        },
    }
};