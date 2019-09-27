const merge = require('webpack-merge');
const common = require('./webpack.base.config');

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'inline-source-map',
  // devServer: {
  //   contextBase: "./dist",  // 本地服务器所加载的页面所在目录
  //   historyApiFallback: true,  //不跳转   404 重定向  【很重要】
  //   inline: true,  // 实时刷新
  //   host: 'localhost',
  //   port: 3000,
  //   open: true, //自动打开浏览器
  //   hot: true,  //热更新
  //   compress: true  //开启gzip  会压缩代码
  // },
});