const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = (env, argv) => {
    return {
        entry: "./src/main.js",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist")
        },
        target: "electron-main",
        devtool: "inline-source-map",
        module: {
            rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }]
        },
        node: {
            __dirname: false,
            __filename: false
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            })
        ]
    };
};