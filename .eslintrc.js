// - rules         启用额外的规则或覆盖默认的规则
// - extends       指定eslint规范
// - plugins       引用第三方的插件
// - parser        指定eslint的解析器
// - root          限定配置文件的使用范围
// - env           指定代码运行的宿主环境
// - globals       声明在代码中的自定义全局变量
// - parserOptions 设置解析器选项
module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parser: 'babel-eslint',
  "parserOptions": {
    "ecmaFeatures": {
      "js": true,
      'jsx': true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "import"
  ],
  "rules": {
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 1,
    "indent": ["error", 2],
    "quotes": ["error", "double"], //强制使用双引号
    "semi": ["error", "always"],
    "no-console": process.env.NODE_ENV === 'production' ? 2 : 1,
    "no-unused-vars": process.env.NODE_ENV === 'production' ? ["error"] : ["warn"]
  }
};