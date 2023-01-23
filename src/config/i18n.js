import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationIT from "../assets/translations/it.json";

// the translations
const resources = {
  it: {
    translation: translationIT,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "it",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
