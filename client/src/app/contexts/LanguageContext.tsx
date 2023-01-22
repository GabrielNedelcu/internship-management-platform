import { createContext, useState, ReactNode } from "react";

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
  const [language, setLanguage] = useState<string>("en");

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
