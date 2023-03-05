import { notification } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { loginUser, requestPassword } from "../api";
import { UserContext } from "app/contexts/UserContext";
import { LanguageContext } from "app/contexts/LanguageContext";

const useSignIn = () => {
  const navigate = useNavigate();

  const { setUserID, setAccessToken } = useContext(UserContext);
  const { setLanguage } = useContext(LanguageContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reqPasswordEmail, setReqPasswordEmail] = useState("");

  const redirectAfterLogin = (userRole: string) => {
    switch (userRole) {
      case "admin":
        return navigate("/dashboard/admin");
      case "student":
        return navigate("student/overview");
      case "company":
        return navigate("/dashboard/admin");
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
        console.log(data);
        if (data.profileCompleted) redirectAfterLogin(data?.accountRole);
        else return navigate("/student/profile-setup");
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
