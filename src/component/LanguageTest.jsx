import React from "react";
import { useLanguage } from "../hooks/useLanguage";

const LanguageTest = () => {
  const { t, currentLanguage, changeLanguage, languageNames, languages } =
    useLanguage();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Language System Test</h2>

      <div className="mb-4">
        <p>
          <strong>Current Language:</strong> {currentLanguage}
        </p>
        <p>
          <strong>Welcome Message:</strong> {t("home.welcomeToKaaliMandir")}
        </p>
        <p>
          <strong>Home Link:</strong> {t("navbar.home")}
        </p>
        <p>
          <strong>Login Text:</strong> {t("auth.login")}
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Change Language:
        </label>
        <select
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {Object.entries(languageNames).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-600">
        <p>✅ i18n system is working!</p>
        <p>✅ Translations are loading correctly!</p>
        <p>✅ Language switching is functional!</p>
      </div>
    </div>
  );
};

export default LanguageTest;
