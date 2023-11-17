const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
    context: __dirname,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    mangle: true,
                },
            }),
        ],
    },
    resolve: {
        alias: {
            services: path.resolve(__dirname, "src/services/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: ">1%" }]],
                    },
                },
            },
        ],
    },
};
