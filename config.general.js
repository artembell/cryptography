const path = require("path");

module.exports = (env, argv) => {
    return {
        name: "general-config",
        entry: "./src/main.js",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist")
        },
        target: "electron-main",
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
            extensions: ["js", "jsx"]
        },
        node: {
            __dirname: false,
            __filename: false
        }
    };
};