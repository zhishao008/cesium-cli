/* eslint-disable */
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    venders: ["react", "react-dom", "react-router-dom", "antd"]
  },
  output: {
    filename: './dist/js/[name].js',
    path: path.join(__dirname, './'),
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "./manifest.json"),
      name: "[name]",
      context: __dirname
    })
  ]
}