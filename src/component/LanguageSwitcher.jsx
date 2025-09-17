import React from "react";
import { useLanguage } from "../hooks/useLanguage";

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, languageNames, languages } =
    useLanguage();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="language-select"
        className="text-sm font-medium text-gray-700"
      >
        Language:
      </label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.entries(languageNames).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
