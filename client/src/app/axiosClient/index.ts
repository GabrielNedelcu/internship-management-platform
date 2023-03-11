import axios, { AxiosRequestConfig } from "axios";
import { BACKEND_URL } from "../../common/constants";

const axiosClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token)
      config.headers!["Authorization"] =
        "Bearer " + token?.slice(1, token.length - 1);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosClient;
