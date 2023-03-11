import axiosClient from "app/axiosClient";
import { addParameterToQuery } from "common/utils";

const API_URL = "/companies";

/**
 * Retrieve all the companies from the server
 *
 * @param validated if the companies have been validated or not
 * @returns array containing a list with all the companies
 */
export const getAllCompanies = async (validated: boolean) => {
  let url: string = `${API_URL}?`;
  url = addParameterToQuery(url, "validated", validated ? "true" : "false");
  url = addParameterToQuery(
    url,
    "fields",
    "name,email,fieldOfWork,numOffers,numPositions,createdAt"
  );

  const res = await axiosClient.get(url);

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

/**
 * Fetch a company's data
 *
 * @param companyId id of the company to fetch data
 * @returns server response
 */
export const getCompany = async (companyId: string) => {
  const res = await axiosClient.get(`${API_URL}/${companyId}`);

  return res.data;
};
