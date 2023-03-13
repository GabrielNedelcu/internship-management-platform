import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

import { notification } from "antd";

import { useMutation } from "@tanstack/react-query";

import { UserContext } from "./UserContext";

import { updateUserLanguage } from "./api";
import { useLocalStorage } from "common/hooks";

import i18n from "i18n";
import { useTranslation } from "react-i18next";

const initialState = {
  language: "en",
  setLanguage: (_: string) => {},
};

interface ILanguagerContext {
  language: string;
  setLanguage: (language: string) => void;
}

interface ILanguageContextWrapperProps {
  children: ReactNode;
}

const LanguageContext = createContext<ILanguagerContext>(initialState);

const LanguageContextWrapper = ({ children }: ILanguageContextWrapperProps) => {
  const { userID } = useContext(UserContext);
  const { t } = useTranslation();

  const [language, setLanguage] = useLocalStorage("lang", "en");

  const { mutate: mutateUpdateUserLanguage } = useMutation(
    ["updateUserLanguage"],
    () => updateUserLanguage(language),
    {
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: t("LANGUAGE_CHANGE_ERR"),
          duration: 2,
        });
      },
    }
  );

  useEffect(() => {
    if (userID) {
      mutateUpdateUserLanguage();
    }
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };
export default LanguageContextWrapper;
