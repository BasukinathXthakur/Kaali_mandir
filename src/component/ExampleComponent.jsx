import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const ExampleComponent = () => {
  const { t, currentLanguage, isHindi, isMaithili } = useTranslation();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {t("home.welcomeToKaaliMandir")}
      </h1>

      <p className="mb-4">{t("home.yourTempleAnytimeAnywhere")}</p>

      <div className="space-y-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {t("home.bookAPuja")}
        </button>

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          {t("home.joinCommunity")}
        </button>
      </div>

      {/* Conditional rendering based on language */}
      {isHindi && (
        <div className="mt-4 p-2 bg-yellow-100 rounded">
          <p className="text-sm">हिंदी में देख रहे हैं</p>
        </div>
      )}

      {isMaithili && (
        <div className="mt-4 p-2 bg-green-100 rounded">
          <p className="text-sm">मैथली में देख रहे हैं</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Current Language: {currentLanguage}
      </div>
    </div>
  );
};

export default ExampleComponent;
