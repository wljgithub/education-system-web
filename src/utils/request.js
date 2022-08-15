import axios from "axios";
import { ElMessage } from "element-plus";

// 创建axios实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时
});

// 异常拦截器
const errorHandler = (error) => {
  if (error.response && error.response.data && error.response.data.code !== 0) {
    let message = error.response.data.message;
    ElMessage({
      message: message,
      grouping: true,
      type: "error",
      center: true,
    });
    return Promise.reject(message);
  }

  if (error.response) {
    // 从localstorage 获取 token
    // 处理 401 认证失败 和 403 权限
  }

  return Promise.reject(error);
};

// 如果用户已登录，每次请求都携带token
request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use((response) => {
  // 提示服务端的错误信息
  const data = response.data;
  if (data.code && data.code != 0) {
    ElMessage({
      message: data.message,
      grouping: true,
      type: "error",
      center: true,
    });
    return Promise.reject(data.message);
  }
  return data;
}, errorHandler);

export default request;
