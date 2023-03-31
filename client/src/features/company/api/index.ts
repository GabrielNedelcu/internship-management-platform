import axiosClient from "app/axiosClient";
import { URL_ROUTES } from "common/constants";
import { ICompanyData, IQueryParameters } from "common/types";
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
  queryParams: IQueryParameters,
  offerId?: string
) => {
  const paramURL = buildQuery(`${URL_ROUTES.APPLICATIONS}`, queryParams);
  let url = addParameterToQuery(paramURL, "search", searchValue);
  if (offerId) url = addParameterToQuery(url, "offer", offerId);
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

export const getAnnex1Template = async () => {
  const res = await axiosClient.get(`${URL_ROUTES.TEMPLATES}/annex_1`, {
    responseType: "blob",
  });
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
 * Download the cv of a student
 * @param studentId id of the student
 * @returns server response
 */
export const getApplicationsCV = async (offerId?: string) => {
  let url = buildQuery(`${URL_ROUTES.APPLICATIONS}`, { fields: "cv" });
  if (offerId) url = addParameterToQuery(url, "offer", offerId);
  const res = await axiosClient.get(url, {
    responseType: "blob",
  });

  return res.data;
};

/**
 * Update the logged in student data
 * @param data new data
 * @returns server response
 */
export const uploadCompanyAnnex = async (
  companyID: string,
  data: ICompanyData
) => {
  const res = await axiosClient.patch(
    `${URL_ROUTES.COMPANIES}/${companyID}`,
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
 * Download the contract of a company
 * @param companyId id of the company
 * @returns server response
 */
export const getCompanyContract = async (companyId: string) => {
  const res = await axiosClient.get(
    `${URL_ROUTES.COMPANIES}/${companyId}/contract`,
    {
      responseType: "blob",
    }
  );

  return res.data;
};

/**
 * Retrieve all the internships from the server
 * @param queryParams query parameters
 * @returns server response
 */
export const getInternships = async (
  searchValue: string,
  queryParams: IQueryParameters,
  offerId?: string
) => {
  const paramURL = buildQuery(`${URL_ROUTES.INTERNSHIPS}`, queryParams);
  let url = addParameterToQuery(paramURL, "search", searchValue);
  if (offerId) url = addParameterToQuery(paramURL, "offer", offerId);
  const res = await axiosClient.get(url);

  return res.data;
};

/**
 * Get an internship by id
 * @param internshipId id of the application
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
 * Get the number of applications
 * @param url collection controller url
 * @returns server response
 */
export const getInReviewApplications = async (status?: string) => {
  let url = `${URL_ROUTES.APPLICATIONS}/count`;
  if (status) url = `${URL_ROUTES.APPLICATIONS}/count?status=${status}`;
  const res = await axiosClient.get(url);
  return res.data;
};
