import { axiosClient } from "app/axiosClient";
import { URL_ROUTES } from "common/constants";
import { IQueryParameters } from "common/types";
import { addParameterToQuery, buildQuery } from "common/utils";

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

/**
 * Retrieve all the offers from the server
 * @param queryParams query parameters
 * @returns server response
 */
export const getOffers = async (
  offerTitle: string,
  queryParams: IQueryParameters,
  companyID?: string
) => {
  const paramURL = buildQuery(`${URL_ROUTES.OFFERS}`, queryParams);
  let url: string = addParameterToQuery(paramURL, "search", offerTitle);
  if (companyID) url = addParameterToQuery(url, "company", companyID);
  const res = await axiosClient.get(url);
  return res.data;
};

/**
 * Retrieve all the applications from the logged in student
 * @param queryParams query parameters
 * @returns server response
 */
export const getSelfApplications = async (
  searchValue: string,
  queryParams: IQueryParameters
) => {
  const paramURL = buildQuery(`${URL_ROUTES.APPLICATIONS}`, queryParams);
  const url = addParameterToQuery(paramURL, "search", searchValue);
  const res = await axiosClient.get(url);
  return res.data;
};

/**
 * Retrieve offer data from the server
 * @param offerID id of the offer
 * @param queryParams query parameters
 * @returns server response
 */
export const getOffer = async (
  offerID: string,
  queryParams: IQueryParameters
) => {
  const url = buildQuery(`${URL_ROUTES.OFFERS}/${offerID}`, queryParams);
  const res = await axiosClient.get(url);
  return res.data;
};

/**
 * Retrieve offer stats from the server
 * @param offerID id of the offer
 * @returns server response
 */
export const getOfferStats = async (offerID: string) => {
  const res = await axiosClient.get(`${URL_ROUTES.OFFERS}/${offerID}/stats`);
  return res.data;
};
