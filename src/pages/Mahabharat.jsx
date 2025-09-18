import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
// import ChapterDetailModal from "../component/ChapterDetailModal";
import completeMahabharataData from "../data/completeMahabharataData";

const Mahabharat = () => {
  const { t } = useLanguage();
  const [expandedParva, setExpandedParva] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedParvaSlug, setSelectedParvaSlug] = useState(null);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredParvas, setFilteredParvas] = useState([]);

  const mahabharatData = {
    title: "Mahabharata",
    subtitle: "The Great Epic of Ancient India",
    description:
      "The Mahabharata is one of the two major Sanskrit epics of ancient India, the other being the Ramayana. It narrates the struggle between two groups of cousins in the Kurukshetra War and the fates of the Kaurava and the Pandava princes and their successors. This complete digital version contains all 18 parvas with detailed Sanskrit verses, translations, and comprehensive story content.",

    parvas: completeMahabharataData.getAllParvas(),
  };

  const toggleParva = (parvaId) => {
    setExpandedParva(expandedParva === parvaId ? null : parvaId);
  };

  const handleChapterClick = (parvaSlug, chapterNumber) => {
    setSelectedParvaSlug(parvaSlug);
    setSelectedChapter(chapterNumber);
    setIsChapterModalOpen(true);
  };

  const handleNavigateChapter = (chapterNumber) => {
    setSelectedChapter(chapterNumber);
  };

  const handleCloseChapterModal = () => {
    setIsChapterModalOpen(false);
    setSelectedChapter(null);
    setSelectedParvaSlug(null);
  };

  // Create parva slug mapping from the comprehensive data
  const parvaSlugMap = {};
  completeMahabharataData.getAllParvas().forEach((parva) => {
    parvaSlugMap[parva.id] = parva.slug;
  });

  // Filter parvas based on search term
  const filterParvas = (parvas, searchTerm) => {
    if (!searchTerm.trim()) return parvas;

    return parvas.filter(
      (parva) =>
        parva.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parva.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parva.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parva.keyEvents.some((event) =>
          event.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        parva.mainCharacters.some((character) =>
          character.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  };

  // Get filtered parvas
  const displayParvas =
    filteredParvas.length > 0 ? filteredParvas : mahabharatData.parvas;

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = filterParvas(mahabharatData.parvas, term);
    setFilteredParvas(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link
              to="/literature"
              className="flex items-center text-white hover:text-purple-200 transition-colors"
            >
              <ArrowLeft className="mr-2" />
              {t("mahabharat.backToLiterature", "Back to Literature")}
            </Link>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="text-6xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
              {mahabharatData.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              {mahabharatData.subtitle}
            </p>
            <p className="text-lg opacity-80 max-w-4xl mx-auto">
              {mahabharatData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {completeMahabharataData.getParvaStatistics().totalParvas}
              </div>
              <div className="text-gray-700 font-medium">Parvas (Books)</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {completeMahabharataData
                  .getParvaStatistics()
                  .totalChapters.toLocaleString()}
              </div>
              <div className="text-gray-700 font-medium">Chapters</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {completeMahabharataData
                  .getParvaStatistics()
                  .totalVerses.toLocaleString()}
              </div>
              <div className="text-gray-700 font-medium">Verses</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                Complete
              </div>
              <div className="text-gray-700 font-medium">Sanskrit Text</div>
            </div>
          </div>
        </div>
      </div>

      {/* Parvas Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {t("mahabharat.eighteenParvas", "The Eighteen Parvas")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t(
                "mahabharat.exploreParvas",
                "Explore each book of the great epic"
              )}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t(
                    "mahabharat.searchPlaceholder",
                    "Search parvas, chapters, or events..."
                  )}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="mt-2 text-center text-sm text-gray-600">
                  {displayParvas.length} parva(s) found
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {displayParvas.map((parva) => (
              <div
                key={parva.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleParva(parva.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                          {parva.id}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 font-devanagari">
                            {parva.name}
                          </h3>
                          <p className="text-lg text-purple-600 font-medium">
                            {parva.englishName}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 ml-16">
                        {parva.description}
                      </p>
                      <div className="flex items-center space-x-6 ml-16 text-sm text-gray-500">
                        <span>{parva.chapterCount} Chapters</span>
                        <span>{parva.verses.toLocaleString()} Verses</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {expandedParva === parva.id ? (
                        <ChevronDown className="text-purple-600" />
                      ) : (
                        <ChevronRight className="text-purple-600" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedParva === parva.id && (
                  <div className="border-t bg-gray-50 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Key Events */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                          {t("mahabharat.keyEvents", "Key Events")}
                        </h4>
                        <ul className="space-y-2">
                          {parva.keyEvents.map((event, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{event}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Characters */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                          {t("mahabharat.keyCharacters", "Key Characters")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {parva.mainCharacters
                            .slice(0, 8)
                            .map((character, index) => (
                              <span
                                key={index}
                                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {character}
                              </span>
                            ))}
                          {parva.mainCharacters.length > 8 && (
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                              +{parva.mainCharacters.length - 8} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Read All Chapters Button */}
                    <div className="mt-6 text-center">
                      <button
                        onClick={() =>
                          handleChapterClick(parvaSlugMap[parva.id], 1)
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                      >
                        {t("mahabharat.readAllChapters", "Read All Chapters")} (
                        {parva.chapterCount})
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bhagavad Gita Highlight */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {t("mahabharat.bhagavadGita", "Bhagavad Gita")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t(
                "mahabharat.divineSong",
                "The Divine Song - A jewel within the Mahabharata"
              )}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🕉️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t(
                  "mahabharat.foundInParva",
                  "Found in Bhishma Parva (Book 6)"
                )}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">18</div>
                <div className="text-gray-700 font-medium">Chapters</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">700</div>
                <div className="text-gray-700 font-medium">Verses</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  4,500
                </div>
                <div className="text-gray-700 font-medium">Words</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-6">
                {t(
                  "mahabharat.gitaDescription",
                  "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is a conversation between Prince Arjuna and Lord Krishna, who serves as his charioteer. This sacred text addresses the moral and philosophical dilemmas faced by Arjuna on the battlefield of Kurukshetra."
                )}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                {t("mahabharat.readGita", "Read Bhagavad Gita")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("mahabharat.exploreMore", "Explore More Sacred Texts")}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {t(
              "mahabharat.discoverWisdom",
              "Discover the wisdom of ancient India"
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/literature"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {t("mahabharat.backToLiterature", "Back to Literature")}
            </Link>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              {t("mahabharat.readRamayana", "Read Ramayana")}
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Detail Modal */}
      <ChapterDetailModal
        isOpen={isChapterModalOpen}
        onClose={handleCloseChapterModal}
        parvaSlug={selectedParvaSlug}
        chapterNumber={selectedChapter}
        onNavigateChapter={handleNavigateChapter}
        epicType="mahabharata"
      />
    </div>
  );
};

export default Mahabharat;
