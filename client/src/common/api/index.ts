import { axiosClient } from "app/axiosClient";
const API_ACCOUNTS_URL = "/accounts";

export const checkAccountEmail = async (email: string) => {
  const res = await axiosClient.head(`${API_ACCOUNTS_URL}/${email}`);

  return res.data;
};
