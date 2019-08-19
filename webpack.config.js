let path = require("path"),
    HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index',
    output: {
        path: path.join(__dirname, "dist/"),
        filename: '[name].js'
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [

            {
                test: /\.ts$/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}