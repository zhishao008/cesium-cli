/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");  webpack4以下用
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //webpack4以上使用
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
const CopywebpackPlugin = require("copy-webpack-plugin");

console.log("current mode = " + process.env.NODE_ENV);

module.exports = {
  entry: {
    bundle: "./src/index.js",   //['./src/index.js']都支持
    // vendors: './src'
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name].[hash:8].js",
    chunkFilename: "./js/[name].[chunkhash].js",
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json",
    publicPath: "/",
    //需要编译Cesium中的多行字符串 
    sourcePrefix: "",
    // library: "util",
    // libraryTarget: "umd"
  },
  amd: {
    //允许Cesium兼容 webpack的require方式 
    toUrlUndefined: true
  },
  node: {
    // 解决fs模块的问题（Resolve node module use of fs）
    fs: "empty"
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'async',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {  // 抽离第三方插件
          test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
          name: "vendors",
          priority: -10                       // 抽取优先级
        },
        utilCommon: {   // 抽离自定义工具库
          name: "common",
          minSize: 0,     // 将引用模块分离成新代码文件的最小体积
          minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
          priority: -20
        }
      }
    }
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
        enforce: "pre",           // 在webpack编译之前进行检测
        test: /.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.(js|jsx)$/, //以js jsx结尾的文件
        exclude: /node_modules/, //处理node_modules的内容（已经处理过的文件就不再处理） 
        include: path.resolve(__dirname, "src"),  //打包的范围（src文件夹里面的内容需要打包）
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
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
        include: path.resolve("./src")
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
        use: ["url-loader"]
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
      cesium: path.resolve(__dirname, cesiumSource),  //如果放到二级目录下 这里的目录也要修改
      "@": path.resolve("../src")
    },
    extensions: [".js", ".jsx", ".json", "css", "less"]  //定义了解析模块时候的配置，可以指定模块的后缀，这样在引入的时候可以不需要写后缀，第一个参数为 "" 或者不写
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunk: ["bundle"],
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        //collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: "index.html",  //可以设置HTML输出的路径和文件名
      template: "./template/index.html",  //可以设置哪个index.html为模板
      hash: true
    }),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: "Workers" }]),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, "Assets"), to: "Assets" }]),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, "Widgets"), to: "Widgets" }]),
    new webpack.DefinePlugin({
      //Cesium载入静态的资源的相对路径
      CESIUM_BASE_URL: JSON.stringify("")
    })
  ]
}