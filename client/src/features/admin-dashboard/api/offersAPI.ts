import axiosClient from "app/axiosClient";

const API_URL = "/offers";

/**
 * Retrieve all the offers (of validated companies) from the server
 * @returns aserver response
 */
export const getAllOffers = async () => {
  const res = await axiosClient.get(`${API_URL}`);

  return res.data;
};

/**
 * Retrieve all the ofers of a company
 * @param companyId id of the company
 * @returns server response
 */
export const getCompanyOffers = async (companyId: string) => {
  const res = await axiosClient.get(`${API_URL}?company=${companyId}`);

  return res.data;
};

/**
 * Get offer data
 * @param offerId id of the offer
 * @returns server response
 */
export const getOfferData = async (offerId: string) => {
  const res = await axiosClient.get(`${API_URL}/${offerId}`);

  return res.data;
};
