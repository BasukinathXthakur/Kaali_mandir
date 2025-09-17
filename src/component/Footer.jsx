import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPrayingHands,
  FaOm,
} from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-orange-900 to-gray-900 text-white pt-10 pb-5">
      <div className="container mx-auto px-4">
        {/* Om Symbol */}
        <div className="flex justify-center mb-8">
          <div className="bg-orange-600 text-white p-4 rounded-full inline-block">
            <FaOm size={32} />
          </div>
        </div>

        {/* Decorative Border */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-devanagari text-orange-500 mb-4">
              Kaali Mandir
            </h3>
            <p className="text-gray-300 mb-4">{t("footer.footerAbout")}</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-orange-500 hover:text-orange-300 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-300 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-300 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-300 transition-colors"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-300 transition-colors"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("navbar.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("navbar.events")}
                </Link>
              </li>
              <li>
                <Link
                  to="/donations"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("navbar.donations")}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.gallery")}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t("footer.footerServices")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("home.pujaServices")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.hawan")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.marriageCeremonies")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.spiritualGuidance")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t("footer.contactUs")}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <span className="text-gray-400">info@kaalimandir.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                <span className="text-gray-400">
                  123 Temple Street, Spiritual City, India - 110001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-5 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Kaali Mandir.{" "}
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
