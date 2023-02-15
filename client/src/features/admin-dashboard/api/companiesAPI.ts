import { axiosClient } from "app/axiosClient";

const API_URL = "/companies";

/**
 * Retrieve all the companies from the server
 *
 * @param validated if the companies have been validated or not
 * @returns array containing a list with all the companies
 */
export const getAllCompanies = async (validated: boolean) => {
  const res = await axiosClient.get(`${API_URL}?validated=${validated}`);

  return res.data;
};

/**
 * Accept a company to the platform
 *
 * @param companyId id of the company to accept
 * @returns server response
 */
export const acceptCompany = async (companyId: string) => {
  const res = await axiosClient.patch(`${API_URL}/${companyId}`, {
    validated: true,
  });

  return res.data;
};
