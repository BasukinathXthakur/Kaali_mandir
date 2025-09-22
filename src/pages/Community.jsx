import React, { useState } from "react";
import {
  Users,
  Heart,
  Star,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  CheckCircle,
  Globe,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const Community = () => {
  const { t } = useLanguage();
  const [joinForm, setJoinForm] = useState({
    name: "",
    fatherName: "",
    religion: "",
    pincode: "",
    email: "",
    contactNo: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setJoinForm({
      ...joinForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setJoinForm({
        name: "",
        fatherName: "",
        religion: "",
        pincode: "",
        email: "",
        contactNo: "",
      });
    }, 3000);
  };

  const communityStats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: t("community.activeMembers"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      number: "50+",
      label: t("community.eventsOrganized"),
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Star className="w-8 h-8" />,
      number: "1000+",
      label: t("community.livesTouched"),
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: "25+",
      label: t("community.citiesReached"),
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
            {t("community.title")}
          </h1>
          <p className="text-xl text-orange-100">{t("community.subtitle")}</p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t("community.ourImpact")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("community.impactDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${stat.color} text-white flex items-center justify-center mb-4`}
                >
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Community Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  {t("community.joinOurCommunity")}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {t("community.joinDescription")}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {t("community.benefit1")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t("community.benefit1Desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {t("community.benefit2")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t("community.benefit2Desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {t("community.benefit3")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t("community.benefit3Desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Join Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {t("community.joinForm")}
                </h3>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {t("community.welcomeMessage")}
                    </h4>
                    <p className="text-gray-600">
                      {t("community.welcomeDescription")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-1" />
                          {t("community.fullName")} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={joinForm.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder={t("community.enterFullName")}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-1" />
                          {t("community.fatherName")} *
                        </label>
                        <input
                          type="text"
                          name="fatherName"
                          value={joinForm.fatherName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder={t("community.enterFatherName")}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Heart className="w-4 h-4 inline mr-1" />
                          {t("community.religion")} *
                        </label>
                        <select
                          name="religion"
                          value={joinForm.religion}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">
                            {t("community.selectReligion")}
                          </option>
                          <option value="hindu">{t("community.hindu")}</option>
                          <option value="sikh">{t("community.sikh")}</option>
                          <option value="jain">{t("community.jain")}</option>
                          <option value="buddhist">
                            {t("community.buddhist")}
                          </option>
                          <option value="other">{t("community.other")}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {t("community.pincode")} *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={joinForm.pincode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder={t("community.enterPincode")}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          {t("community.email")} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={joinForm.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder={t("community.enterEmail")}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-1" />
                          {t("community.contactNo")} *
                        </label>
                        <input
                          type="tel"
                          name="contactNo"
                          value={joinForm.contactNo}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder={t("community.enterContactNo")}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {t("community.joinNow")}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              {t("community.needHelp")}
            </h3>
            <p className="text-gray-300">{t("community.contactUsQuestions")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold mb-1">{t("community.phone")}</h4>
              <p className="text-gray-300">9334223837</p>
            </div>
            <div>
              <Mail className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold mb-1">{t("community.email")}</h4>
              <p className="text-gray-300">jagatkaalimandir@gmail.com</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold mb-1">{t("community.location")}</h4>
              <p className="text-gray-300">26.342225, 86.004515</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
