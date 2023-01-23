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

  const [language, setLanguage] = useState<string>("en");

  const { mutate: mutateUpdateUserLanguage } = useMutation(
    ["updateUserLanguage"],
    () => updateUserLanguage(language),
    {
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description:
            "We've encountered an error while updating the language preference in you account! The change was not saved!",
          duration: 2,
        });
      },
    }
  );

  useEffect(() => {
    if (userID) {
      mutateUpdateUserLanguage();
    }
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
