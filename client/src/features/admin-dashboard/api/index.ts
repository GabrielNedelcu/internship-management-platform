import axiosClient from "app/axiosClient";
import { URL_ROUTES } from "common/constants";
import { addParameterToQuery, buildQuery } from "common/utils";
import {
  ICompanyData,
  IInternshipData,
  IProfessorData,
  IQueryParameters,
} from "../../../common/types";

/**
 * Retrieve all the internships from the server
 * @param queryParams query parameters
 * @returns server response
 */
export const getInternships = async (
  searchValue: string,
  queryParams: IQueryParameters,
  studentProjection?: string,
  companyProjection?: string,
  offerProjection?: string,
  professorProjection?: string
) => {
  const paramURL = buildQuery(`${URL_ROUTES.INTERNSHIPS}`, queryParams);
  let url = addParameterToQuery(paramURL, "search", searchValue);
  if (studentProjection)
    addParameterToQuery(paramURL, "studentFields", studentProjection);
  if (companyProjection)
    addParameterToQuery(paramURL, "companyFields", companyProjection);
  if (offerProjection)
    addParameterToQuery(paramURL, "offerFields", offerProjection);
  if (professorProjection)
    addParameterToQuery(paramURL, "professorFields", professorProjection);
  const res = await axiosClient.get(url);
  return res.data;
};

/**
 * Retrieve all the professors from the server
 * @param queryParams query parameters
 * @returns server response
 */
export const getProfessors = async (
  searchValue: string,
  queryParams: IQueryParameters,
  departament?: string,
  available?: boolean
) => {
  const paramURL = buildQuery(`${URL_ROUTES.PROFESSORS}`, queryParams);
  let url = addParameterToQuery(paramURL, "search", searchValue);
  if (departament)
    url = addParameterToQuery(paramURL, "departament", departament);
  if (available) url = addParameterToQuery(paramURL, "available", available);

  const res = await axiosClient.get(url);
  return res.data;
};

/**
 * Update internship data
 *
 * @param internshipId internship to update
 * @param data new data to update with
 * @returns server response
 */
export const patchInternship = async (
  internshipId: string,
  data: IInternshipData
) => {
  const res = await axiosClient.patch(
    `${URL_ROUTES.INTERNSHIPS}/${internshipId}`,
    data
  );

  return res.data;
};

/**
 * Retrieve all the companies from the server
 * @param searchFor value to search for
 * @param queryParams query parameters
 * @param validatedOnly if true, will only retrieve validated offers, otherwise, only not validated
 * @returns server response
 */
export const getAllCompanies = async (
  searchFor: string,
  queryParams: IQueryParameters,
  validatedOnly: boolean
) => {
  const paramURL = buildQuery(`${URL_ROUTES.COMPANIES}`, queryParams);
  let url = addParameterToQuery(paramURL, "search", searchFor);
  if (validatedOnly === false)
    url = addParameterToQuery(paramURL, "validated", validatedOnly);

  const res = await axiosClient.get(url);
  return res.data;
};

/**
 * Update a company's data
 * @param companyId company id
 * @param newData new data to be updated with
 * @returns
 */
export const patchCompany = async (
  companyId: string,
  newData: ICompanyData
) => {
  const res = await axiosClient.patch(
    `${URL_ROUTES.COMPANIES}/${companyId}`,
    newData
  );
  return res.data;
};
