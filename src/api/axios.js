//这个文件是对axios进行二次封装
import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 20000,
});

export default service;
