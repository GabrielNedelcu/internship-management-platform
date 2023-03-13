import { useState } from "react";
import { notification } from "antd";
import { useMutation } from "@tanstack/react-query";

import { checkAccountEmail } from "common";
import { createStudent, uploadStudentsFile } from "../api/studentAPI";
import { useTranslation } from "react-i18next";

const useStudentCreation = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [cnp, setCNP] = useState("");
  const [passport, setPassport] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [notCreatedAccounts, setNotCreatedAccounts] = useState("");
  const [detectedAccounts, setDetectedAccounts] = useState(0);
  const [createdAccounts, setCreatedAccounts] = useState(0);

  const resetFields = () => {
    setName("");
    setEmail("");
    setGroup("");
    setCNP("");
    setPassport("");
  };

  const { mutate: mutateCreateStudent } = useMutation(
    ["createStudent"],
    () => {
      setLoading(true);

      return createStudent({ name, email, group, cnp, passport });
    },
    {
      onSuccess: (res) => {
        setLoading(false);

        notification.success({
          message: t("ACCOUNT_CREATED"),
          description: t("ACCOUNT_CREATED_MSG"),
          duration: 10,
        });

        resetFields();
      },
      onError: () => {
        setLoading(false);

        notification.error({
          message: "Ooops ...",
          description: t("ACCOUNT_CREATION_ERROR"),
          duration: 10,
        });

        resetFields();
      },
    }
  );

  const { mutate: mutateCheckUniqueEmail, status: emailCheckResult } =
    useMutation(["checkUniqueEmail", email], (email: string) =>
      checkAccountEmail(email)
    );

  const { mutate: mutateUplaodStudents } = useMutation(
    ["uploadStudentsFile"],
    (options: any) => {
      setLoading(true);

      const { onSuccess, onError, file } = options;

      return uploadStudentsFile(file, onSuccess, onError);
    },
    {
      onSuccess: (res: any) => {
        setLoading(false);

        setNotCreatedAccounts(res.fails.join("   ;   "));
        setDetectedAccounts(res.detected);
        setCreatedAccounts(res.success.length);
        setOpenModal(true);
      },
      onError: () => {
        setLoading(false);

        notification.error({
          message: "Ooops ...",
          description: t("FILE_UPLOAD_ERROR"),
          duration: 10,
        });

        resetFields();
      },
    }
  );

  return {
    cnp,
    setCNP,
    loading,
    passport,
    setName,
    setEmail,
    setGroup,
    openModal,
    setLoading,
    setPassport,
    setOpenModal,
    createdAccounts,
    emailCheckResult,
    detectedAccounts,
    notCreatedAccounts,
    mutateCreateStudent,
    mutateUplaodStudents,
    mutateCheckUniqueEmail,
  };
};

export default useStudentCreation;
