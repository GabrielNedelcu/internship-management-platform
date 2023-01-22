import axios, { AxiosRequestConfig } from "axios";
import { BACKEND_URL } from "./constants";

const axiosClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const token = localStorage.getItem("token");
//     if (token)
//       config.headers!["Authorization"] =
//         "Bearer " + token?.slice(1, token.length - 1);
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

export default axiosClient;
