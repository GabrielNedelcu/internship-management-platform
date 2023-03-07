import { notification } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { loginUser, requestPassword } from "../api";
import { UserContext } from "app/contexts/UserContext";
import { LanguageContext } from "app/contexts/LanguageContext";
import { USER_ROLES } from "common/constants";

const useSignIn = () => {
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
              description:
                "Seems like your profile hasn't been validated yet. You cannot access the platform",
              duration: 10,
            });
          else {
            if (data?.contractSigned) redirectAfterLogin(data?.accountRole);
            else
              notification.error({
                message: "Ooops ...",
                description: "N-AI SEMNAT INCA CONTRACTUL",
                duration: 10,
              });
          }
        } else redirectAfterLogin(data?.accountRole);
      },
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: "Invalid credentials ... please try again!",
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
          message: "Great!",
          description:
            "We have sent you your email containing the instructions you need to follow in order to successfully. Please check your inbox!",
          duration: 10,
        });
      },
      onError: () => {
        notification.error({
          message: "Something went wrong ...",
          description:
            "An error occured while resetting your password! Please try again later ...",
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
