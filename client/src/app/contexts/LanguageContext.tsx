import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

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

  useEffect(() => {
    if (userID) {
      updateUserLanguage(language);
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
