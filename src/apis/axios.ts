import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { getItem } from "./localStorage";

// function setInterceptors(instance: any) {
//   // request interceptor
//   instance.interceptors.request.use(
//     (config: any) => {
//       config.headers.Authorization = `Bearer ${getItem("accessToken")}`;
//       return config;
//     },
//     (error: any) => Promise.reject(error)
//   );
//   // response interceptor
//   instance.interceptors.response.use(
//     (response: any) => response,
//     (error: any) => Promise.reject
//   );
//   return instance;
// }

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_TEST_LCD_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
};

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  const createdInstance = axios.create(config);
  //   const interceptorInstance = setInterceptors(createdInstance);
  return createdInstance;
};

const axiosInstance = initialization(axiosRequestConfiguration);

const errorCheck = async (err: any) => {
  if (!err || !err.response) {
    return null;
  }

  if (
    err.response.status &&
    (err.response.status === 403 || err.response.status === 401)
  ) {
    return err.response.data;
  }

  return err.response.data;
};

export const getApi = async (url: string, params?: any) => {
  try {
    const res = await axiosInstance({
      url,
      method: "GET",
      params: params,
    });

    console.log("getApi -", url, res.data);

    return res.data;
  } catch (err) {
    return errorCheck(err);
  }
};

export const postApi = async (url: string, data?: any) => {
  try {
    const res = await axiosInstance({
      url,
      method: "POST",
      data,
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return errorCheck(err);
  }
};
