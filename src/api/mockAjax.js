import axios from "axios";
import NProgress from "nprogress";
const service = axios.create({
  baseURL: "/mock",
  timeout: 20000,
});

service.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});
service.interceptors.response.use(
  (response) => {
    NProgress.done( );
    return response.data;
  },
  (error) => {
    NProgress.done();
    alert("请求失败,错误信息" + error.message || "未知错误");
    return new Promise(() => {});
  }
);
export default service