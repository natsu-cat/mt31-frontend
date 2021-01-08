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
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
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