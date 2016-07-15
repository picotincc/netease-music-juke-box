"use strict";

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve("./src"),

    entry: {
        vendor: [ "jquery" ],
        nm: ["./nm/index.js", "./nm/resource/index.less", "./nm/format.ico" ]
    },

    output: {
        path: path.resolve("./assets"),
        publicPath: "/assets",
        filename: "[name]/bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.jpe?g$|\.ico$|\.png$/,
                loaders: [
                    'file?name=[path][name].[ext]',
                ]
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        }),
        new ExtractTextPlugin("./[name]/resource/bundle.css")
    ],

    devServer: {
        proxy: {
            "/api/*": {
                target: "http://music.163.com/",
                host: "music.163.com",
                secure: false,
                headers: {
                    "Referer": "http://music.163.com"
                }
            }
        }
    }
};
