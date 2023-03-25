import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

import { IProfessorData } from "common/types";
import { getStudent } from "../api";

const useStudentProfile = (studentId: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { data: studentData, refetch: refetchStudentData } =
    useQuery<IProfessorData>(
      ["getStudentDataForProfile", studentId],
      () => {
        setIsLoading(true);
        return getStudent(studentId || "");
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
          notification.error({
            message: "Ooops ...",
            description: t("CANNOT_RETRIEVE_STUDENT_DATA"),
            duration: 10,
          });
        },
      }
    );

  return { isLoading, studentData, refetchStudentData };
};

export default useStudentProfile;
