import { axiosClient } from "app/axiosClient";

const API_URL = "/students";

interface ICreateStudentData {
  name: string;
  email: string;
  group: string;
  cnp: string;
  passport: string;
}

export const createStudent = async (data: ICreateStudentData) => {
  const res = await axiosClient.post(`${API_URL}`, data);

  return res.data;
};
