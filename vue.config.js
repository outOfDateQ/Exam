const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 设置./可以在打包之后不需要服务器也可以简单的浏览网页
  publicPath: './'
})
