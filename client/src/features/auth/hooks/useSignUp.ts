import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { signUpCompany, checkAccountEmail } from "../api";
import { useState } from "react";
import { wait } from "@testing-library/user-event/dist/utils";

const useSignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { mutate: mutateSignUpCompany, isLoading: signUpCompanyLoading } =
    useMutation(["signUpCompany"], () => signUpCompany(formData), {
      onSuccess: () => {
        notification.success({
          message: "Account created",
          description:
            "Great! Your account has been created successfully. You will not have access on the platform until a faculty will review your account and approve your request! We will notify you on your email ass soon as possible! You will be redirected to the login page in 5 seconds!",
          duration: 10,
        });

        wait(5000).then(() => navigate("/"));
      },
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description:
            "Error occured while creating your account! Please try again later!",
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
