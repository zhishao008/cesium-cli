const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //webpack4以上使用
// optimize-css-assets-webpack-plugin：压缩css文件   uglifyjs-webpack-plugin：压缩js文件
module.exports = merge(common, {
  mode: 'production',
  devtool: '',
  plugins: [
    //提取css
    new MiniCssExtractPlugin({
      filename: "./css/[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    })
  ]
});