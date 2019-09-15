const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
    return {
        name: "react-config",
        entry: "./src/app/App.jsx",
        output: {
            filename: "app.js",
            path: path.resolve(__dirname, "dist")
        },
        target: "electron-renderer",
        devtool: "source-map",
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }]
        },
        resolve: {
            extensions: [".js", "jsx"]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            })
        ]
    };
};