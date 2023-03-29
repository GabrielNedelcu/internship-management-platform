import axiosClient from "app/axiosClient";
import { URL_ROUTES } from "common/constants";
import { addParameterToQuery, buildQuery } from "common/utils";
import {
  ICompanyData,
  IInternshipData,
  IProfessorData,
  IQueryParameters,
  IStudentData,
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

/**
 * Create a new professor
 * @param professorData the professor's data
 * @returns server response
 */
export const createProfessor = async (professorData: IProfessorData) => {
  const res = await axiosClient.post(`${URL_ROUTES.PROFESSORS}`, professorData);

  return res.data;
};

/**
 * Upload the excel file containing the professors to the server
 *
 * @param file - file to upload
 * @param onSucces - callback for the antd file uploader
 * @param onError - callback for the antd file uploader
 * @returns query response
 */
export const uploadProfessorsFile = async (
  file: any,
  onSucces: () => void,
  onError: () => void
) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosClient.post(
    `${URL_ROUTES.PROFESSORS}/multiple`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.data.data.length !== 0) onSucces();
  else onError();

  return res.data;
};

/**
 * Update professor data
 *
 * @param professorId professor to update
 * @param data new data to update with
 * @returns server response
 */
export const updateProfessor = async (
  professorId: string,
  data: IProfessorData
) => {
  const res = await axiosClient.patch(
    `${URL_ROUTES.PROFESSORS}/${professorId}`,
    data
  );

  return res.data;
};

/**
 * Retrieve a professor's data
 * @param professorId
 * @returns server response
 */
export const getProfessor = async (professorId: string) => {
  const res = await axiosClient.get(`${URL_ROUTES.PROFESSORS}/${professorId}`);

  return res.data;
};

/**
 * Fetch a company's data
 *
 * @param companyId id of the company to fetch data
 * @returns server response
 */
export const getCompany = async (companyId: string) => {
  const res = await axiosClient.get(`${URL_ROUTES.COMPANIES}/${companyId}`);

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
 * Retrieve all the offers from the server
 * @param queryParams query parameters
 * @returns server response
 */
export const getOffers = async (
  searchValue: string,
  queryParams: IQueryParameters,
  companyId?: string
) => {
  const paramURL = buildQuery(`${URL_ROUTES.OFFERS}`, queryParams);
  let url = addParameterToQuery(paramURL, "search", searchValue);
  if (companyId) url = addParameterToQuery(url, "company", companyId);
  const res = await axiosClient.get(url);
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

/**
 * Retrieve all the professors from the server
 * @param queryParams query parameters
 * @returns server response
 */
export const getStudents = async (
  searchValue: string,
  queryParams: IQueryParameters
) => {
  const paramURL = buildQuery(`${URL_ROUTES.STUDENTS}`, queryParams);
  let url = addParameterToQuery(paramURL, "search", searchValue);

  const res = await axiosClient.get(url);
  return res.data;
};

/**
 * Call create student endpoint
 *
 * @param data student data
 * @returns server reponse
 */
export const createStudent = async (data: IStudentData) => {
  const res = await axiosClient.post(`${URL_ROUTES.STUDENTS}`, data);

  return res.data;
};

/**
 * Update student data
 *
 * @param studentId student to update
 * @param data new data to update with
 * @returns server response
 */
export const updateStudent = async (studentId: string, data: IStudentData) => {
  const res = await axiosClient.patch(
    `${URL_ROUTES.STUDENTS}/${studentId}`,
    data
  );

  return res.data;
};

/**
 * Upload the excel file containing the professors to the server
 *
 * @param file - file to upload
 * @param onSucces - callback for the antd file uploader
 * @param onError - callback for the antd file uploader
 * @returns query response
 */
export const uploadStudentsFile = async (
  file: any,
  onSucces: () => void,
  onError: () => void
) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosClient.post(
    `${URL_ROUTES.STUDENTS}/multiple`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.data.data.length !== 0) onSucces();
  else onError();

  return res.data;
};

/**
 * Retrieve the students from querying the internships
 * @param queryParams query parameters
 * @returns server response
 */
export const getStudentsFromInternships = async (
  searchValue: string,
  queryParams: IQueryParameters,
  professor?: string,
  company?: string,
  offer?: string
) => {
  const paramURL = buildQuery(`${URL_ROUTES.INTERNSHIPS}`, queryParams);
  let url = addParameterToQuery(paramURL, "search", searchValue);
  if (professor) url = addParameterToQuery(paramURL, "professor", professor);
  if (company) url = addParameterToQuery(paramURL, "company", company);
  if (offer) url = addParameterToQuery(paramURL, "offer", offer);
  const res = await axiosClient.get(url);
  return res.data;
};

/**
 * Retrieve a student's data
 * @param studentId
 * @returns server response
 */
export const getStudent = async (studentId: string) => {
  const res = await axiosClient.get(`${URL_ROUTES.STUDENTS}/${studentId}`);

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
 * Get the document count from a collection
 * @param url collection controller url
 * @returns server response
 */
export const getDocumentsCount = async (url: string) => {
  const res = await axiosClient.get(`${url}/count`);
  return res.data;
};

/**
 * Get the stats for all the offers
 * @returns server response
 */
export const getOffersStats = async () => {
  const res = await axiosClient.get(`${URL_ROUTES.OFFERS}/stats`);
  return res.data;
};

/**
 * Get the stats for corresponding to the applications
 * @returns server response
 */
export const getApplicationsStats = async () => {
  const res = await axiosClient.get(`${URL_ROUTES.APPLICATIONS}/stats`);
  return res.data;
};
