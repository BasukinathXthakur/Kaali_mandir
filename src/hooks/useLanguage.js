import { useTranslation } from "react-i18next";

// Language configuration
export const LANGUAGES = {
  ENGLISH: "en",
  HINDI: "hi",
  MAITHILI: "mai",
};

// Language display names
export const LANGUAGE_NAMES = {
  [LANGUAGES.ENGLISH]: "English",
  [LANGUAGES.HINDI]: "हिन्दी",
  [LANGUAGES.MAITHILI]: "मैथली",
};

// Custom hook for easier translation usage
export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return {
    t,
    currentLanguage,
    changeLanguage,
    languageNames: LANGUAGE_NAMES,
    languages: LANGUAGES,
    // Helper functions
    isEnglish: currentLanguage === LANGUAGES.ENGLISH,
    isHindi: currentLanguage === LANGUAGES.HINDI,
    isMaithili: currentLanguage === LANGUAGES.MAITHILI,
  };
};
