import { axiosClient } from "app/axiosClient";

const API_URL = "/professors";

interface ICreateProfessorData {
  name: string;
  email: string;
  title: string;
  privatePhone: string;
  publicPhone: string;
  departament: string;
  numPositions: number;
}

/**
 * Call create professor endpoint
 *
 * @param data professor data
 * @returns server reponse
 */
export const createProfessor = async (data: ICreateProfessorData) => {
  console.log(data);

  const res = await axiosClient.post(`${API_URL}`, data);

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
  const res = await axiosClient.post(`${API_URL}/multiple`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.data.data.length !== 0) onSucces();
  else onError();

  return res.data;
};

/**
 * Retrieve all the professors from the server
 *
 * @returns array containing a list with all the professors
 */
export const getAllProfessors = async () => {
  const res = await axiosClient.get(`${API_URL}`);

  return res.data;
};

/**
 * Retrieve professor data from the server
 * @param professorId
 * @returns server response
 */
export const getProfessor = async (professorId: string) => {
  const res = await axiosClient.get(`${API_URL}/${professorId}`);

  return res.data;
};

/**
 * Update professor data
 *
 * @param professorId professor to update
 * @param data new data to update with
 * @returns server response
 */
export const patchProfessor = async (professorId: string, data: any) => {
  const res = await axiosClient.patch(`${API_URL}/${professorId}`, data);

  return res.data;
};
