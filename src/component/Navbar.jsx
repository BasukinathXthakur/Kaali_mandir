// Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../services/authService";

export default function Navbar() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img
              src="/src/assets/logo.png"
              alt="Kaali Mandir"
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <Link to="/">
            <span className="text-xl font-semibold text-gray-800">Kaali Mandir</span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors font-bold">
            Home
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-orange-500 transition-colors font-bold">
            Events
          </Link>
          <Link to="/donations" className="text-gray-700 hover:text-orange-500 transition-colors font-bold">
            Donations
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-gray-700 hover:text-orange-500 transition-colors font-bold">
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
              <IoIosArrowDown className="ml-1" />
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
              <FaUserCircle className="text-3xl text-gray-500" />
            </div>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                {currentUser ? (
                  <>
                    <div className="block px-4 py-2 text-sm text-gray-700 border-b">
                      {currentUser.displayName || currentUser.email}
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
