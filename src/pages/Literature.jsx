import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";
import { DEITIES } from "../data/aarti";
import { useLanguage } from "../hooks/useLanguage";

const Literature = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="text-6xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
              {t("literature.title", "Hindu Literature & Aarti")}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {t(
                "literature.subtitle",
                "Explore Sacred Texts and Devotional Prayers"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Deity Cards Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {t("literature.deityAartis", "Deity Aartis")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t(
                "literature.selectDeity",
                "Select a deity to explore their sacred aartis and prayers"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEITIES.map((deity) => (
              <Link
                key={deity.slug}
                to={`/literature/${deity.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {/* Card Header with Gradient */}
                  <div
                    className="h-32 relative overflow-hidden "
                    style={{
                      backgroundImage: `url(${deity.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white font-devanagari drop-shadow-lg">
                        {deity.name} {t("literature.aarti", "Aarti")}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {t("literature.availableAartis", "Available Aartis")}
                      </h4>
                      <div className="space-y-2">
                        {deity.aartis.slice(0, 3).map((aarti, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm text-gray-600"
                          >
                            <span>{aarti.title}</span>
                          </div>
                        ))}
                        {deity.aartis.length > 3 && (
                          <div className="text-sm text-orange-600 font-medium">
                            +{deity.aartis.length - 3}{" "}
                            {t("literature.more", "more")}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-medium group-hover:text-orange-700">
                        {t("literature.viewAll", "View All Aartis")}
                      </span>
                      <ChevronRight className="text-orange-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Literature Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {t("literature.sacredTexts", "Sacred Texts")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t(
                "literature.exploreAncientWisdom",
                "Explore ancient wisdom and spiritual teachings"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Bhagavad Gita */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t("literature.bhagavadGita", "Bhagavad Gita")}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t(
                    "literature.divineSong",
                    "The Divine Song of Lord Krishna"
                  )}
                </p>
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  {t("literature.readNow", "Read Now")}
                </button>
              </div>
            </div>

            {/* Ramayana */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏹</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t("literature.ramayana", "Ramayana")}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t("literature.epicOfRama", "The Epic Journey of Lord Rama")}
                </p>
                <button className="text-orange-600 font-medium hover:text-orange-700">
                  {t("literature.readNow", "Read Now")}
                </button>
              </div>
            </div>

            {/* Mahabharata */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚔️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t("literature.mahabharata", "Mahabharata")}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t("literature.greatEpic", "The Great Epic of Ancient India")}
                </p>
                <button className="text-purple-600 font-medium hover:text-purple-700">
                  {t("literature.readNow", "Read Now")}
                </button>
              </div>
            </div>

            {/* Vedas */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🕉️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t("literature.vedas", "Vedas")}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t(
                    "literature.ancientScriptures",
                    "Ancient Sacred Scriptures"
                  )}
                </p>
                <button className="text-green-600 font-medium hover:text-green-700">
                  {t("literature.readNow", "Read Now")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("literature.stayConnected", "Stay Connected with Divine Wisdom")}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {t(
              "literature.joinCommunity",
              "Join our community to receive daily spiritual insights and updates"
            )}
          </p>
          <Link
            to="/community"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            {t("literature.joinNow", "Join Community")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Literature;
