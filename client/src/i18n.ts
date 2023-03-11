import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const detection = {
  order: [
    "localStorage",
    "querystring",
    "cookie",
    "sessionStorage",
    "navigator",
    "htmlTag",
    "path",
    "subdomain",
  ],
  lookupLocalStorage: "lang",
  caches: ["cookie"],
};

const backend = {
  loadPath: "/assets/locales/{{lng}}/translation.json",
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ro"],
    fallbackLng: "en",
    detection,
    backend,
  });

export default i18n;
