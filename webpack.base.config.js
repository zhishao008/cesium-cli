const webpack = require("webpack");
const path = require("path");
const BUILD_PATH = path.resolve(__dirname, "./dist");

const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");  webpack4以下用
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //webpack4以上使用
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const CopywebpackPlugin = require('copy-webpack-plugin');

console.log('current mode = ' + process.env.NODE_ENV);

module.exports = {
  //devtools:"source-map",
  entry: {
    bundle: ["./src/index.js"]
  },
  output: {
    path: BUILD_PATH,
    filename: "[name].[hash:8].js",
    chunkFilename: "[name].[chunkhash].js",
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
    publicPath: "/",
    //需要编译Cesium中的多行字符串 
    sourcePrefix: ''
  },
  amd: {
    //允许Cesium兼容 webpack的require方式 
    toUrlUndefined: true
  },
  node: {
    // 解决fs模块的问题（Resolve node module use of fs）
    fs: 'empty'
  },
  // 定义模块规则
  module: {
    rules: [
      // {
      //     test:/\.(js|jsx)$/, //以js结尾的文件
      //     loader:"babel-loader", //用babel-loader处理  es6语法
      //     exclude:/node_modules/, //处理node_modules的内容（已经处理过的文件就不再处理） 
      //     //include:path.resolve(__dirname,"src"),  //打包的范围（src文件夹里面的内容需要打包）
      //     query:{
      //         presets:["@babel/preset-env", "@babel/preset-react"] //最新的babel来处理
      //     }
      // },
      {
        test: /\.(js|jsx)$/, //以js jsx结尾的文件
        //loader:"babel-loader", //用babel-loader处理  es6语法
        exclude: /node_modules/, //处理node_modules的内容（已经处理过的文件就不再处理） 
        //include:path.resolve(__dirname,"src"),  //打包的范围（src文件夹里面的内容需要打包）
        use: {
          loader: "babel-loader",
          // presets:["@babel/preset-env", "@babel/preset-react"] //最新的babel来处理
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.less/,
        // use: ["style-loader",MiniCssExtractPlugin.loader,"css-loader",'less-loader'],
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "less-loader" // compiles Less to CSS
          }
        ],
        include: path.resolve('./src')
      },
      // {
      //     test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))||woff2?|svg|jpe?g|png|gif|ico)$/,
      //     loader: [
      //         //小于10kb的图片会自动转成dataUrl
      //         "url?limit=1024&name=img/[hash:8].[name].[ext]",
      //         "image?{mypassOnDebug:true, progressive: true,optimizationLevel:3,pngquant:{quality:'65-80',speed:4}}"
      //     ]
      // },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        exclude: /antd/,
        use: ['url-loader']
      },
      // {
      //   test: /\.json$/,
      //   exclude:/node_modules/, 
      //   use: 'json-loader'
      // }
    ]
  },
  // 引入资源省略后缀、资源别名配置
  resolve: {
    alias: {
      // Cesium模块名称
      cesium: path.resolve(__dirname, cesiumSource),
      '@': path.resolve('../src')
    },
    extensions: [".js", ".jsx", ".json", 'css', 'less']  //定义了解析模块时候的配置，可以指定模块的后缀，这样在引入的时候可以不需要写后缀，第一个参数为 "" 或者不写
  },
  plugins: [
    //["import", { libraryName: "antd", style: "css" }], // `style: true` 会加载 less 文件
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    }),
    new HtmlWebpackPlugin({
      chunk: ["bundle"],
      title: "bundle1",
      filename: "index.html",  //可以设置HTML输出的路径和文件名
      template: "./template/index.html",  //可以设置哪个index.html为模板
      hash: true
    }),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
    new webpack.DefinePlugin({
      //Cesium载入静态的资源的相对路径
      CESIUM_BASE_URL: JSON.stringify('')
    })

  ]
}
