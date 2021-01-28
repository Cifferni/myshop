//这个文件是对axios进行二次封装 -
//额外的让axios发请求的时候,具有其他的功能更
//配置基础路径,和超时配置  -
//添加进度条信息
//返回的响应不再需要从data属性中拿数据,而是响应就是我们要的数据
//同义处理请求和错误,具体请求也可以选择处理或不处理
import axios from "axios";
//引入关于nprogress的js
import NProgress from "nprogress";
//引入关于nprogress的css
import "nprogress/nprogress.css";
const service = axios.create({
  baseURL: "/api", //接口中重复的路径部分
  timeout: 20000, //请求超时时间
});
//请求拦截器
service.interceptors.request.use((config) => {
  NProgress.start(); //进度条开始
  return config;
});

//响应拦截器
service.interceptors.response.use(
  (response) => {
    NProgress.done(); //进度条开始
    return response.data;
  },
  (error) => {
    NProgress.done(); //进度条开始
    alert("请求失败,错误信息" + error.message || "未知错误");
    return new Promise(() => {});
  }
);

export default service; 
