const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/app/renderer.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: "development",
    target: "electron-renderer",
    module: {
        rules: [{
            test: /\.(js|jsx)/,
            exclude: /node-modules/,
            use: 'babel-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        hot: true
    }
}