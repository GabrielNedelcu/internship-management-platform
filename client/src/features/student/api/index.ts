import { axiosClient } from "app/axiosClient";
import { IEditableStudentData } from "../../../common/types";

const API_URL = "/students";

/**
 * Update the logged in student data
 * @param data new data
 * @returns server response
 */
export const updateStudentData = async (data: IEditableStudentData) => {
  const res = await axiosClient.patch(`${API_URL}/self`, data, {
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
    ? `${API_URL}/self?fields=${fields}`
    : `${API_URL}/self`;
  const res = await axiosClient.get(url);

  return res.data;
};
