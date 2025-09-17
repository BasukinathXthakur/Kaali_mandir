// Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { useLanguage } from "../hooks/useLanguage";

export default function Navbar() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const { currentLanguage, changeLanguage, t, languageNames, languages } =
    useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const languageRef = useRef(null);
  const userMenuRef = useRef(null);
  const servicesRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };

    // Use mousedown for better detection
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close services menu when route changes
  useEffect(() => {
    setServicesOpen(false);
  }, [location.pathname]);

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
          <Link to="/" onClick={() => setServicesOpen(false)}>
            <img
              src="/src/assets/logo.png"
              alt="Kaali Mandir"
              className="w-12 h-12 rounded-full border-2 border-orange-600 p-1"
            />
          </Link>
          <Link to="/" onClick={() => setServicesOpen(false)}>
            <span className="text-xl font-devanagari text-orange-600">
              Kaali Mandir
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("navbar.home")}
          </Link>
          <div className="relative" ref={servicesRef}>
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                setServicesOpen(!servicesOpen);
              }}
              className="flex items-center text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              <span>{t("navbar.services")}</span>
              <ChevronDown className="ml-1" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-20">
                <Link
                  to="/pujas"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Heart className="mr-3 text-orange-600" />{" "}
                  {t("home.bookPujaChadhava")}
                </Link>
                <Link
                  to="/panchang"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Clock className="mr-3 text-orange-600" />{" "}
                  {t("home.panchangHoroscope")}
                </Link>
                <Link
                  to="/music"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Music className="mr-3 text-orange-600" />{" "}
                  {t("home.devotionalMusic")}
                </Link>
                <Link
                  to="/literature"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <BookOpen className="mr-3 text-orange-600" />{" "}
                  {t("home.hinduLiterature")}
                </Link>
                <Link
                  to="/virtual-temple"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setServicesOpen(false)}
                >
                  <Building2 className="mr-3 text-orange-600" />{" "}
                  {t("home.divineTemple")}
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/events"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("navbar.events")}
          </Link>
          <Link
            to="/yatra"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("navbar.yatra")}
          </Link>
          <Link
            to="/community"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("navbar.community")}
          </Link>
          <Link
            to="/donations"
            onClick={() => setServicesOpen(false)}
            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
          >
            {t("navbar.donations")}
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setServicesOpen(false)}
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              {t("navbar.admin")}
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative" ref={languageRef}>
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                setLanguageOpen(!languageOpen);
              }}
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
              onMouseDown={(e) => {
                e.stopPropagation();
                setUserMenuOpen(!userMenuOpen);
              }}
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
                        {t("navbar.adminDashboard")}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("navbar.logout")}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t("navbar.login")}
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
