import axiosClient from "app/axiosClient";
import { IPasswordChangeData } from "common/types";
const ACCOUNTS_URL = "/accounts";
const AUTH_URL = "/auth";

/**
 * Check if an email is unique
 *
 * @param email email to check
 * @returns server response
 */
export const checkAccountEmail = async (email: string) => {
  const res = await axiosClient.head(`${ACCOUNTS_URL}/${email}`);

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

/**
 * Refresh the access token of the currently logged in user
 *
 * @returns server response
 */
export const refreshToken = async () => {
  const res = await axiosClient.post(`${AUTH_URL}/tokens`);

  return res.data;
};

/**
 * Change the password for the logged in user
 * @param newPassData new password and the confirmation password
 * @returns server response
 */
export const changeUserPassword = async (newPassData: IPasswordChangeData) => {
  const res = await axiosClient.patch(`${ACCOUNTS_URL}/self`, newPassData);

  return res.data;
};

/**
 * Change the language for the logged in user
 * @param lang new language
 * @returns server response
 */
export const changeUserLanguage = async (lang: string) => {
  const res = await axiosClient.patch(`${ACCOUNTS_URL}/self`, {
    language: lang,
  });

  return res.data;
};
