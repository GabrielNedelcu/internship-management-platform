import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

import { IProfessorData } from "common/types";
import { createProfessor, updateProfessor, uploadProfessorsFile } from "../api";

interface IUpdateProfessorProps {
  profId: string;
  newData: IProfessorData;
}

const useProfessorCreateUpdate = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [notCreatedAccounts, setNotCreatedAccounts] = useState("");
  const [detectedAccounts, setDetectedAccounts] = useState(0);
  const [createdAccounts, setCreatedAccounts] = useState(0);

  const { mutate: mutateCreateProfessor } = useMutation(
    ["createProfessor"],
    (professorData: IProfessorData) => {
      setIsLoading(true);

      return createProfessor(professorData);
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

  const { mutate: mutateUploadProfessors } = useMutation(
    ["uploadProfessorsFile"],
    (options: any) => {
      setIsLoading(true);

      const { onSuccess, onError, file } = options;

      return uploadProfessorsFile(file, onSuccess, onError);
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

  const { mutate: mutateUpdateProfessor } = useMutation(
    ["updateProfessor"],
    (updateProps: IUpdateProfessorProps) => {
      setIsLoading(true);
      return updateProfessor(updateProps.profId, updateProps.newData);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
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
    mutateCreateProfessor,
    mutateUploadProfessors,
    mutateUpdateProfessor,
  };
};

export default useProfessorCreateUpdate;
