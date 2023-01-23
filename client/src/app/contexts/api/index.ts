import { axiosClient } from "app/axiosClient";

const API_URL = "/accounts";

export const updateUserLanguage = async (language: string) => {
  const res = await axiosClient.patch(`${API_URL}/self`, {
    language,
  });

  return res.data;
};
