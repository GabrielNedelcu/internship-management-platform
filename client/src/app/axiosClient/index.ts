import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { refreshToken } from "common/api";
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

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const prevRequest: any = error?.config;

    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const res = await refreshToken();
      const token = res.accessToken;

      localStorage.setItem("accessToken", `"${token}"`);

      prevRequest.headers["Authorization"] = "Bearer " + token;
      return axiosClient(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
