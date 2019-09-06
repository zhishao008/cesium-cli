
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      'antd-mobile': true,
      dva: {
        immer: true
      },
      dynamicImport: { webpackChunkName: true },
      title: 'mobileHiddenDanger',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/mf": {
      "target": "http://10.30.20.200:8081",
      "changeOrigin": true,
      // "pathRewrite": { "^/mf/api" : "" },
      // "logLevel": "debug"
    }
  }
}
