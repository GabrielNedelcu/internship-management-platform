import { axiosClient } from "app/axiosClient";

const API_URL = "/auth";

export const loginUser = async (email: string, password: string) => {
  const res = await axiosClient.post(`${API_URL}/login`, {
    email,
    password,
  });

  return res.data;
};

export const refreshToken = async () => {
  const res = await axiosClient.post(
    `${API_URL}/tokens`,
    {},
    { withCredentials: true }
  );

  return res.data;
};
