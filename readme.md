1、确保电脑安装了node 8.x.x以上版本
2、根目录下执行npm install 
3、npm run auto/yarn auto
4、生产和开发环境打包配置分离
https://juejin.im/post/5cd7c9ea6fb9a0324d43c9b9#heading-1

cross-env：在命令行中配置环境变量

copy-webpack-plugin：拷贝资源

mini-css-extract-plugin：单独提取至css文件

optimize-css-assets-webpack-plugin：压缩css文件

uglifyjs-webpack-plugin：压缩js文件

第三方库和业务代码分离打包

使用chunk  

减小bundle的大小 

每次打包的时候dist 目录不会自动删除

将logic层打包成单独的js