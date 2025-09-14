import React, { createContext, useContext, useState, useEffect } from "react";
import {
  LANGUAGES,
  LANGUAGE_NAMES,
  TransliterationService,
  TRANSLATIONS,
} from "../services/transliterationService";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES.ENGLISH);
  const [translations, setTranslations] = useState({});

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage && Object.values(LANGUAGES).includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("selectedLanguage", currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = async (newLanguage) => {
    if (newLanguage === currentLanguage) return;

    setCurrentLanguage(newLanguage);

    // Pre-load translations for the new language
    try {
      const newTranslations = {};
      const translationKeys = Object.keys(TRANSLATIONS[LANGUAGES.ENGLISH]);

      for (const key of translationKeys) {
        newTranslations[key] =
          await TransliterationService.translateAndTransliterate(
            key,
            newLanguage
          );
      }

      setTranslations(newTranslations);
    } catch (error) {
      console.error("Error loading translations:", error);
    }
  };

  const t = (key) => {
    // Return cached translation if available
    if (translations[key]) {
      return translations[key];
    }

    // Fallback to direct translation
    return TransliterationService.getTranslation(key, currentLanguage);
  };

  const transliterate = async (
    text,
    fromLang = LANGUAGES.ENGLISH,
    toLang = currentLanguage
  ) => {
    return await TransliterationService.transliterateText(
      text,
      fromLang,
      toLang
    );
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    transliterate,
    languages: LANGUAGES,
    languageNames: LANGUAGE_NAMES,
    isEnglish: currentLanguage === LANGUAGES.ENGLISH,
    isHindi: currentLanguage === LANGUAGES.HINDI,
    isMaithili: currentLanguage === LANGUAGES.MAITHILI,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
