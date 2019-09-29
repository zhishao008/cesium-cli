/* eslint-disable no-undef */
// const webpack = require("webpack");
// const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
// optimize-css-assets-webpack-plugin：压缩css文件 
module.exports = merge(common, {
  mode: "production",
  plugins: [
    //提取css
    new MiniCssExtractPlugin({
      filename: "./css/[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    }),
    new AutoDllPlugin({
      inject: true,
      filename: "[name]_[hash].js",
      entry: {
        vendor: [
          "react"
        ]
      }
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      uglifyOptions: {
        compress: true
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true
    })
  ]
});