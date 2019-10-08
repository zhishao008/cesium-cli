/* eslint-disable no-undef */
const webpack = require("webpack");

const merge = require("webpack-merge");
const common = require("./webpack.base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

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
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./manifest.json")
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