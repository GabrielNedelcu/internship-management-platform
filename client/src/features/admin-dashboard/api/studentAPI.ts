import { axiosClient } from "app/axiosClient";

const API_URL = "/students";

interface ICreateStudentData {
  name: string;
  email: string;
  group: string;
  cnp: string;
  passport: string;
}

/**
 * Call create student endpoint
 *
 * @param data student data
 * @returns server reponse
 */
export const createStudent = async (data: ICreateStudentData) => {
  const res = await axiosClient.post(`${API_URL}`, data);

  return res.data;
};

/**
 * Upload the excel file containing the students to the server
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
  const res = await axiosClient.post(`${API_URL}/multiple`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.data.data.length !== 0) onSucces();
  else onError();

  return res.data;
};

export const getAllStudents = async () => {
  const res = await axiosClient.get(`${API_URL}`);
  console.log(res.data);
  return res.data;
};
