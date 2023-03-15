import { notification } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { loginUser, requestPassword } from "../api";
import { UserContext } from "app/contexts/UserContext";
import { LanguageContext } from "app/contexts/LanguageContext";
import { USER_ROLES } from "common/constants";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const useSignIn = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { setUserID, setAccessToken } = useContext(UserContext);
  const { setLanguage } = useContext(LanguageContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reqPasswordEmail, setReqPasswordEmail] = useState("");

  const redirectAfterLogin = (userRole: string) => {
    switch (userRole) {
      case USER_ROLES.ADMIN:
        return navigate("/dashboard/admin");
      case USER_ROLES.STUDENT:
        return navigate("student/overview");
      case USER_ROLES.COMPANY:
        return navigate("/company/overview");
    }
  };

  const { mutate: mutateLoginUser } = useMutation(
    ["loginUser"],
    () => {
      return loginUser(email, password);
    },
    {
      onSuccess: (data) => {
        setAccessToken(data?.accessToken);
        setUserID(data?.accountId);

        setLanguage(data?.accountLanguage);

        if (data?.accountRole === USER_ROLES.STUDENT) {
          if (data.profileCompleted) redirectAfterLogin(data?.accountRole);
          else return navigate("/student/profile-setup");
        } else if (data?.accountRole === USER_ROLES.COMPANY) {
          if (!data.validated)
            notification.error({
              message: "Ooops ...",
              description: t("PROFILE_NOT_VALIDATED"),
              duration: 10,
            });
          else {
            if (data?.annex) redirectAfterLogin(data?.accountRole);
            else return navigate("/company/annex");
          }
        } else redirectAfterLogin(data?.accountRole);
      },
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: t("INVALID_CREDENTIALS"),
          duration: 10,
        });
      },
    }
  );

  const { mutate: mutateRequestPassword } = useMutation(
    ["requestPassword"],
    () => requestPassword(reqPasswordEmail),
    {
      onSuccess: () => {
        notification.success({
          message: t("GREAT"),
          description: t("REQUEST_PASSWORD_MSG"),
          duration: 10,
        });
      },
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: t("REQUEST_PASSWORD_ERR"),
          duration: 10,
        });
      },
    }
  );

  return {
    setEmail,
    setPassword,
    mutateLoginUser,
    setReqPasswordEmail,
    mutateRequestPassword,
  };
};

export default useSignIn;
