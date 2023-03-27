import axiosClient from "app/axiosClient";
import { URL_ROUTES } from "common/constants";
import { addParameterToQuery, buildQuery } from "common/utils";
import {
  IInternshipData,
  IQueryParameters,
  IStudentData,
} from "../../../common/types";

/**
 * Update the logged in student data
 * @param data new data
 * @returns server response
 */
export const updateStudentData = async (data: IStudentData) => {
  const res = await axiosClient.patch(`${URL_ROUTES.STUDENTS}/self`, data, {
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
export const getSelfStudent = async (queryParams: IQueryParameters) => {
  const url = buildQuery(`${URL_ROUTES.STUDENTS}/self`, queryParams);
  const res = await axiosClient.get(url);
  return res.data;
};

/**
 * Get the stats for the logged in student
 * @returns server response
 */
export const getSelfStudentStats = async () => {
  const url = buildQuery(`${URL_ROUTES.STUDENTS}/self/stats`);
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
  const paramURL = buildQuery(`${URL_ROUTES.COMPANIES}`, queryParams);
  const url = addParameterToQuery(paramURL, "company", companyName);
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
 * Apply to an offer
 * @param offer id of the offer
 * @param company id of the offer
 *
 * @returns server response
 */
export const applyToOffer = async (offer: string, company: string) => {
  const res = await axiosClient.post(`${URL_ROUTES.APPLICATIONS}`, {
    offer,
    company,
  });
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
 * Download the cv of a student
 * @param studentId id of the student
 * @returns server response
 */
export const getStudentCV = async (studentId: string) => {
  const res = await axiosClient.get(`${URL_ROUTES.STUDENTS}/${studentId}/cv`, {
    responseType: "blob",
  });
  return res.data;
};

/**
 * Update the status of an application
 * @param applicationId id of the application
 * @param newStatus new status
 * @returns server response
 */
export const updateApplicationStatus = async (
  applicationId: string,
  newStatus: string
) => {
  const res = await axiosClient.patch(
    `${URL_ROUTES.APPLICATIONS}/${applicationId}`,
    { status: newStatus }
  );

  return res.data;
};

/**
 * Get an internship by id
 * @param internshipId id of the application
 * @param newStatus new status
 * @returns server response
 */
export const getInternship = async (
  internshipId: string,
  projection?: string,
  studentProjection?: string,
  companyProjection?: string,
  offerProjection?: string,
  professorProjection?: string
) => {
  let url = `${URL_ROUTES.INTERNSHIPS}/${internshipId}`;
  if (projection) url = buildQuery(url, { fields: projection });
  if (studentProjection)
    url = addParameterToQuery(url, "studentFields", studentProjection);
  if (companyProjection)
    url = addParameterToQuery(url, "companyFields", companyProjection);
  if (offerProjection)
    url = addParameterToQuery(url, "offerFields", offerProjection);
  if (professorProjection)
    url = addParameterToQuery(url, "professorFields", professorProjection);

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
 * Update internship documents
 *
 * @param internshipId internship to update
 * @param data new data to update with
 * @returns server response
 */
export const updateInternshipDocs = async (
  internshipId: string,
  data: IInternshipData
) => {
  const res = await axiosClient.patch(
    `${URL_ROUTES.INTERNSHIPS}/${internshipId}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

/**
 * Download a template from the server
 * @param templateEndpoint endpoint where the template is found
 * @returns server response
 */
export const downloadTemplate = async (templateEndpoint: string) => {
  const res = await axiosClient.get(
    `${URL_ROUTES.TEMPLATES}/${templateEndpoint}`,
    {
      responseType: "blob",
    }
  );
  return res.data;
};

/**
 * Download a template from the server
 * @param templateEndpoint endpoint where the template is found
 * @returns server response
 */
export const downloadInternshipDocument = async (
  internshipId: string,
  documentType: string
) => {
  const res = await axiosClient.get(
    `${URL_ROUTES.INTERNSHIPS}/${internshipId}/documents?doc=${documentType}`,
    {
      responseType: "blob",
    }
  );
  return res.data;
};
