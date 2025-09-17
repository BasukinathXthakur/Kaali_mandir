import { useLanguageContext } from "../contexts/LanguageContext";

// Custom hook for easier translation usage
export const useTranslation = () => {
  return useLanguageContext();
};
