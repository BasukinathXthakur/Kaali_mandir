import { useLanguage } from "../contexts/LanguageContext";

// Custom hook for easier translation usage
export const useTranslation = () => {
  const { t, currentLanguage, changeLanguage, languageNames, languages } =
    useLanguage();

  return {
    t,
    currentLanguage,
    changeLanguage,
    languageNames,
    languages,
    // Helper functions
    isEnglish: currentLanguage === languages.ENGLISH,
    isHindi: currentLanguage === languages.HINDI,
    isMaithili: currentLanguage === languages.MAITHILI,
  };
};
