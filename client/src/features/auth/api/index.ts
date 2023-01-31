import { axiosClient } from "app/axiosClient";

const API_AUTH_URL = "/auth";
const API_ACCOUNTS_URL = "/accounts";
const API_COMPANIES_URL = "/companies";

export const loginUser = async (email: string, password: string) => {
  const res = await axiosClient.post(`${API_AUTH_URL}/login`, {
    email,
    password,
  });

  return res.data;
};

export const refreshToken = async () => {
  const res = await axiosClient.post(
    `${API_AUTH_URL}/tokens`,
    {},
    { withCredentials: true }
  );

  return res.data;
};

export const requestPassword = async (email: string) => {
  const res = await axiosClient.patch(`${API_ACCOUNTS_URL}/password`, {
    email,
  });
};

export const signUpCompany = async (data: any) => {
  const res = await axiosClient.post(API_COMPANIES_URL, data);

  return res.data;
};
