// Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Bell,
  Heart,
  BookOpen,
  Music,
  Building2,
  Users,
  MapPin,
  DollarSign,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navbar() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const { currentLanguage, changeLanguage, t, languageNames, languages } =
    useLanguage();
  const navigate = useNavigate();
  const languageRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLanguageChange = async (language) => {
    await changeLanguage(language);
    setLanguageOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-orange-600">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img
              src="/src/assets/logo.png"
              alt="Kaali Mandir"
              className="w-12 h-12 rounded-full border-2 border-orange-600 p-1"
            />
          </Link>
          <Link to="/">
            <span className="text-xl font-devanagari text-orange-600">
              Kaali Mandir
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("home")}
          </Link>
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-orange-600 transition-colors font-medium">
              <span>{t("services")}</span>
              <ChevronDown className="ml-1" />
            </button>
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-20 hidden group-hover:block">
              <Link
                to="/pujas"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                <Heart className="mr-3 text-orange-600" />{" "}
                {t("bookPujaChadhava")}
              </Link>
              <Link
                to="/panchang"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                <Clock className="mr-3 text-orange-600" />{" "}
                {t("panchangHoroscope")}
              </Link>
              <Link
                to="/music"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                <Music className="mr-3 text-orange-600" />{" "}
                {t("devotionalMusic")}
              </Link>
              <Link
                to="/literature"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                <BookOpen className="mr-3 text-orange-600" />{" "}
                {t("hinduLiterature")}
              </Link>
              <Link
                to="/virtual-temple"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                <Building2 className="mr-3 text-orange-600" />{" "}
                {t("divineTemple")}
              </Link>
            </div>
          </div>
          <Link
            to="/events"
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("events")}
          </Link>
          <Link
            to="/yatra"
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("yatra")}
          </Link>
          <Link
            to="/community"
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("community")}
          </Link>
          <Link
            to="/donations"
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("donations")}
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              {t("admin")}
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center border px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {languageNames[currentLanguage]}
              <ChevronDown className="ml-1" />
            </button>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg">
                <button
                  onClick={() => handleLanguageChange(languages.ENGLISH)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    currentLanguage === languages.ENGLISH
                      ? "bg-orange-50 text-orange-600"
                      : ""
                  }`}
                >
                  {languageNames[languages.ENGLISH]}
                </button>
                <button
                  onClick={() => handleLanguageChange(languages.HINDI)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    currentLanguage === languages.HINDI
                      ? "bg-orange-50 text-orange-600"
                      : ""
                  }`}
                >
                  {languageNames[languages.HINDI]}
                </button>
                <button
                  onClick={() => handleLanguageChange(languages.MAITHILI)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    currentLanguage === languages.MAITHILI
                      ? "bg-orange-50 text-orange-600"
                      : ""
                  }`}
                >
                  {languageNames[languages.MAITHILI]}
                </button>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <div
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="cursor-pointer"
            >
              <User className="w-8 h-8 text-gray-500" />
            </div>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                {currentUser ? (
                  <>
                    <div className="block px-4 py-2 text-sm text-gray-700 border-b">
                      {currentUser.name || currentUser.email}
                    </div>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t("adminDashboard")}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("logout")}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t("login")}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
