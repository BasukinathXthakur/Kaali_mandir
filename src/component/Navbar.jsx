// Navbar.jsx
import { useState } from "react";
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
  ChevronDown 
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../services/authService";

export default function Navbar() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
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
            <span className="text-xl font-devanagari text-orange-600">Kaali Mandir</span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
            Home
          </Link>
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-orange-600 transition-colors font-medium">
              <span>Services</span>
              <ChevronDown className="ml-1" />
            </button>
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-20 hidden group-hover:block">
              <Link to="/pujas" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                <Heart className="mr-3 text-orange-600" /> Book Puja & Chadhava
              </Link>
              <Link to="/panchang" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                <Clock className="mr-3 text-orange-600" /> Panchang & Horoscope
              </Link>
              <Link to="/music" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                <Music className="mr-3 text-orange-600" /> Devotional Music
              </Link>
              <Link to="/literature" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                <BookOpen className="mr-3 text-orange-600" /> Hindu Literature
              </Link>
              <Link to="/virtual-temple" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                <Building2 className="mr-3 text-orange-600" /> Virtual Temple
              </Link>
            </div>
          </div>
          <Link to="/events" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
            Events
          </Link>
          <Link to="/yatra" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
            Yatra & Darshan
          </Link>
          <Link to="/community" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
            Community
          </Link>
          <Link to="/donations" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
            Donations
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Admin
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center border px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100"
            >
              English
              <ChevronDown className="ml-1" />
            </button>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  English
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  हिन्दी
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  मैथली 
                </a>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <div onClick={() => setUserMenuOpen(!userMenuOpen)} className="cursor-pointer">
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
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Login / Register
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
