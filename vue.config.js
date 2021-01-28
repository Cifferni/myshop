/* 
    只能在这里配置,因为webpack别隐藏起来了
   在vue.config.js 这个文件中控制webpack
*/
module.exports = {
  lintOnSave: false, //禁用eslint
  devServer: {
    proxy: {
      "/api": {
        // 匹配所有以 '/api'开头的请求路径
        target: "http://182.92.128.115", // 代理目标的基础路径
        changeOrigin: true,
        //pathRewrite: { "^/api": "" },
      },
    },
  },
};
