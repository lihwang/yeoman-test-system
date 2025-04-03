import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Api } from "./swaggerApi";
import { message } from "antd";
//接口地址
const env = import.meta.env.VITE_APP_ENV;
export const baseURL = import.meta.env.VITE_APP_BASE_URL;
const request = new Api({ baseURL });

const formDataList = [
    '/sgks/mgt/login'
]
//添加请求连拦截器
request.instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //在发送请求之前做些什么
    const token: string | null = localStorage.getItem("token") || null;
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    if(formDataList.some(i=>config.url?.includes(i)) ){
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error: AxiosError) => {
    //对请求错误做些什么
    console.log(error, "request-error");
    return Promise.reject(error);
  }
);

//添加响应拦截器
request.instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code !== "200" && env === "prod") {
      message.error(response.data.msg);
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error: AxiosError<Record<string, string>>) => {
    //超出 2xx 范围的状态码都会触发该函数
    //对响应错误做点什么
    // console.log(error, "response-error");

    const { response } = error;
    // 处理 HTTP 网络错误
    let msg = "";

    // HTTP 状态码
    const status = response?.status;

    switch (status) {
      case 400:
        msg = response?.data?.message;
        // 这里可以触发退出的 action
        break;
      case 401:
        msg = "token 失效，请重新登录";
        // 这里可以触发退出的 action
        // logout();
        break;
      case 403:
        msg = "拒绝访问";
        break;
      case 404:
        msg = response?.data?.message;
        break;
      case 500:
        msg = "服务器故障";
        break;
      default:
        msg = "网络连接故障";
    }
    message.error(msg ?? "");

    console.log(msg, "response-error-msg");
    return Promise.reject(error);
  }
);

export default request;
