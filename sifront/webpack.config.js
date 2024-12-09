const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: "/",
        filename: "bandle.js"
    },
    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        port: 8080,
    },
    module:{ 
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.svg$/i,
                type: 'asset',
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.(jpg|png|gif)$/i,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192,
                      },
                    },
                  ],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
                use: ['@svgr/webpack'],
            }            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ]
}