import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

import { IStudentData } from "common/types";
import { createStudent, updateStudent, uploadStudentsFile } from "../api";

interface IUpdateStudentProps {
  studentId: string;
  newData: IStudentData;
}

const useStudentCreateUpdate = (onAfterUpdate?: () => void) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [notCreatedAccounts, setNotCreatedAccounts] = useState("");
  const [detectedAccounts, setDetectedAccounts] = useState(0);
  const [createdAccounts, setCreatedAccounts] = useState(0);

  const { mutate: mutateCreateStudent } = useMutation(
    ["createStudent"],
    (studentData: IStudentData) => {
      setIsLoading(true);

      return createStudent(studentData);
    },
    {
      onSuccess: () => {
        setIsLoading(false);

        notification.success({
          message: t("ACCOUNT_CREATED"),
          description: t("ACCOUNT_CREATED_MSG"),
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);

        notification.error({
          message: "Ooops ...",
          description: t("ACCOUNT_CREATION_ERROR"),
          duration: 10,
        });
      },
    }
  );

  const { mutate: mutateUploadStudents } = useMutation(
    ["uploadStudentsFile"],
    (options: any) => {
      setIsLoading(true);

      const { onSuccess, onError, file } = options;

      return uploadStudentsFile(file, onSuccess, onError);
    },
    {
      onSuccess: (res: any) => {
        setIsLoading(false);

        setNotCreatedAccounts(res.fails.join("   ;   "));
        setDetectedAccounts(res.detected);
        setCreatedAccounts(res.success.length);
        setOpenModal(true);
      },
      onError: () => {
        setIsLoading(false);

        notification.error({
          message: "Ooops ...",
          description: t("FILE_UPLOAD_ERROR"),
          duration: 10,
        });
      },
    }
  );

  const { mutate: mutateUpdateStudent } = useMutation(
    ["updateStudentProfile"],
    (updateProps: IUpdateStudentProps) => {
      setIsLoading(true);
      return updateStudent(updateProps.studentId, updateProps.newData);
    },
    {
      onSuccess: () => {
        setIsLoading(false);

        onAfterUpdate?.();

        notification.success({
          message: t("ACCOUNT_UPDATED"),
          description: t("UPDATE_ACCOUNT_SUCCESS_MSG"),
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);

        notification.error({
          message: "Ooops ...",
          description: t("UPDATE_ACCOUNT_ERR_MSG"),
          duration: 10,
        });
      },
    }
  );

  return {
    isLoading,
    openModal,
    createdAccounts,
    detectedAccounts,
    notCreatedAccounts,
    setOpenModal,
    mutateCreateStudent,
    mutateUploadStudents,
    mutateUpdateStudent,
  };
};

export default useStudentCreateUpdate;
