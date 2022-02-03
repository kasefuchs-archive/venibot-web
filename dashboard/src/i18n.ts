import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18NextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: "en-US",
      detection: {
        order: ["localStorage", "navigator"],
        lookupLocalStorage: "i18n",
      },
      saveMissing: false,
      load: "currentOnly",
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: "/locales/{{lng}}/json/{{ns}}.json",
      },
      react: {
        useSuspense: false,
      },
    },
    (error, _t) => {
      if (error && process.env.NODE_ENV === "development") console.log(error);
    }
  );
