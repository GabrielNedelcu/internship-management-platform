import { notification } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { loginUser } from "../api";
import { UserContext } from "app/contexts/UserContext";
import { LanguageContext } from "app/contexts/LanguageContext";

const useSignIn = () => {
  const navigate = useNavigate();

  const { setUserID, setUserRole, setAccessToken } = useContext(UserContext);
  const { setLanguage } = useContext(LanguageContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectAfterLogin = (userRole: string) => {
    switch (userRole) {
      case "admin":
        return navigate("/dashboard/admin");
      case "student":
        return navigate("/dashboard/admin");
      case "company":
        return navigate("/dashboard/admin");
    }
  };

  const { mutate: mutateLoginUser, isLoading: isLoadingUer } = useMutation(
    ["loginUser"],
    () => loginUser(email, password),
    {
      onSuccess: (data) => {
        setAccessToken(data?.accessToken);
        setUserRole(data?.accountRole);
        setUserID(data?.accountId);

        setLanguage(data?.accountLanguage);

        redirectAfterLogin(data?.accountRole);
      },
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: "Invalid credentials ... please try again!",
          duration: 3,
        });
      },
    }
  );

  return {
    setEmail,
    setPassword,
    mutateLoginUser,
  };
};

export default useSignIn;
