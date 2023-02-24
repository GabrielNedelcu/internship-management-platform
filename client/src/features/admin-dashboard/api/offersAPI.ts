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

/**
 * Retrieve all the ofers of a company
 * @param companyId id of the company
 * @returns array containing a list with all the company offers
 */
export const getCompanyOffers = async (companyId: string) => {
  const res = await axiosClient.get(`${API_URL}?company=${companyId}`);

  return res.data;
};
