import { axiosClient } from "app/axiosClient";
const API_ACCOUNTS_URL = "/accounts";
const AUTH_URL = "/auth";

/**
 * Check if an email is unique
 *
 * @param email email to check
 * @returns server response
 */
export const checkAccountEmail = async (email: string) => {
  const res = await axiosClient.head(`${API_ACCOUNTS_URL}/${email}`);

  return res.data;
};

/**
 * Logout currently signed-in account
 *
 * @returns server response
 */
export const logoutAccount = async () => {
  const res = await axiosClient.delete(`${AUTH_URL}/logout`);

  return res.data;
};
