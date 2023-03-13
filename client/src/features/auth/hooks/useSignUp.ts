import { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { wait } from "@testing-library/user-event/dist/utils";

import { signUpCompany } from "../api";
import { checkAccountEmail } from "common";
import { useTranslation } from "react-i18next";

const useSignUp = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { mutate: mutateSignUpCompany, isLoading: signUpCompanyLoading } =
    useMutation(["signUpCompany"], () => signUpCompany(formData), {
      onSuccess: () => {
        notification.success({
          message: t("ACCOUNT_CREATED"),
          description: t("ACCOUNT_CREATED_MSG"),
          duration: 10,
        });

        wait(5000).then(() => navigate("/"));
      },
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: t("ACCOUNT_CREATION_ERROR"),
          duration: 10,
        });

        wait(5000).then(() => navigate("/"));
      },
    });

  const { mutate: mutateCheckUniqueEmail, status: emailCheckResult } =
    useMutation(["checkUniqueEmail"], (email: string) =>
      checkAccountEmail(email)
    );

  return {
    formData,
    setFormData,
    emailCheckResult,
    mutateSignUpCompany,
    signUpCompanyLoading,
    mutateCheckUniqueEmail,
  };
};

export default useSignUp;
