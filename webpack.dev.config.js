/* eslint-disable no-undef */
const merge = require("webpack-merge");
const common = require("./webpack.base.config");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),  // 本地服务器所加载的页面所在目录
    historyApiFallback: true,  //不跳转   404 重定向  【很重要】
    inline: true,  // 实时刷新
    host: "localhost",
    port: 3000,
    open: true, //自动打开浏览器
    hot: true,  //热更新
    proxy: {
      // '/': 'http://localhost:3000'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
});