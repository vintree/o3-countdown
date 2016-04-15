// webpack.config.js
var path = require("path");
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});
var CopyWebpackPlugin = require('copy-webpack-plugin');
var SwigWebpackPlugin = require('swig-webpack-plugin');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: './app/index.js'
    },
    output: {
        publicPath: "http://127.0.0.1:9090/static/dist/",
        path: path.join(__dirname, 'app/build/'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js'],
        root: __dirname
    },
    // 新添加的module属性
    module: {
        loaders: [
             {
                 test: /\.js?$/,
                 loader: 'babel',
                 exclude: /(node_modules|bower_components)/,
                 query: {
                     presets: ['es2015']
                 }
             }]
    },
    plugins: [
        //UglifyJsPlugin,
    ]
};
