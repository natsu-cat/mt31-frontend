const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

const DEV_PORT = process.env.PORT || 3000;

module.exports = {
    mode: "development",
    entry: src + '/index.tsx',
    plugins: [
        new HtmlWebpackPlugin({
            template: src + '/templates/index.html'
        }),
    ],
    output: {
        path: dist,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js','.css','.scss']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: './tsconfig.json'
                        }
                    },
                    {
                        loader: 'tslint-loader',
                        options: {
                            typeCheck: true,
                            // tslint時に自動的に修正しない
                            fix: false,
                            // warningをエラーにすることでその後のビルドを止める
                            emitErros: true
                        },
                    },
                ],
                exclude: /(node_module|client)/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(dist),
        port: DEV_PORT,
        hot: true,
        historyApiFallback: true,
    }
}