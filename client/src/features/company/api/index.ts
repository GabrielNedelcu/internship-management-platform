import { axiosClient } from "app/axiosClient";
import { URL_ROUTES } from "common/constants";
import { IQueryParameters } from "common/types";
import { buildQuery } from "common/utils";

/**
 * Retrieve company data from the server
 * @param companyID id of the company
 * @param queryParams query parameters
 * @returns server response
 */
export const getCompany = async (
  companyID: string,
  queryParams: IQueryParameters
) => {
  const url = buildQuery(`${URL_ROUTES.COMPANIES}/${companyID}`, queryParams);
  const res = await axiosClient.get(url);
  return res.data;
};
