import { axiosClient } from "app/axiosClient";
import { addParameterToQuery, buildQuery } from "common/utils";
import { IEditableStudentData, IQueryParameters } from "../../../common/types";

const STUDENTS_API_URL = "/students";
const COMPANIES_API_URL = "/companies";
const OFFERS_API_URL = "/offers";

/**
 * Update the logged in student data
 * @param data new data
 * @returns server response
 */
export const updateStudentData = async (data: IEditableStudentData) => {
  const res = await axiosClient.patch(`${STUDENTS_API_URL}/self`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

/**
 * Get the data for the logged in student
 * @returns server response
 */
export const getSelfStudent = async (fields?: string) => {
  const url: string = fields
    ? `${STUDENTS_API_URL}/self?fields=${fields}`
    : `${STUDENTS_API_URL}/self`;
  const res = await axiosClient.get(url);

  return res.data;
};

/**
 * Retrieve all the companies from the server
 * @param queryParams query parameters
 * @returns server response
 */
export const getCompanies = async (
  companyName: string,
  queryParams: IQueryParameters
) => {
  const paramURL: string = buildQuery(`${COMPANIES_API_URL}`, queryParams);
  const url: string = addParameterToQuery(paramURL, "company", companyName);
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
  queryParams: IQueryParameters
) => {
  const paramURL: string = buildQuery(`${OFFERS_API_URL}`, queryParams);
  const url: string = addParameterToQuery(paramURL, "search", offerTitle);
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
  const url: string = buildQuery(`${OFFERS_API_URL}/${offerID}`, queryParams);
  const res = await axiosClient.get(url);
  return res.data;
};
