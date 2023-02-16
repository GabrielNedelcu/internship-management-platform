import { axiosClient } from "app/axiosClient";

const API_URL = "/offers";

/**
 * Retrieve all the offers (of validated companies) from the server
 *
 * @returns array containing a list with all the offers
 */
export const getAllOffers = async () => {
  const res = await axiosClient.get(`${API_URL}`);

  return res.data;
};
