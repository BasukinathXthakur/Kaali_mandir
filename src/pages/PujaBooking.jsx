import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Mail,
  Flame,
  Star,
  Heart,
  BookOpen,
  Sun,
  Moon,
  Zap,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const PujaBooking = () => {
  const { t } = useLanguage();
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    address: "",
    specialRequests: "",
  });

  const pujaTypes = [
    {
      id: 1,
      name: "9wav Durga Puja",
      hindiName: "नवरात्रि दुर्गा पूजा",
      description:
        "Nine-day Durga Puja with complete rituals and ceremonies. Celebrate Navratri with the daily worship of 9 goddesses to receive blessings of protection, prosperity, harmony and divine strength! From Pratipada to Navami Tithi (22 September to 1 October 2025)",
      hindiDescription:
        "नौ दिनों तक दुर्गा पूजा के साथ पूर्ण अनुष्ठान और समारोह",
      logo: "/durgaMaaLogo.jpeg",
      icon: <Star className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      price: "₹15,000",
      duration: "9 Days",
      features: [
        "Complete Durga Saptashati Path",
        "Daily Aarti & Bhog",
        "Kalash Sthapana",
        "Hawan Ceremony",
        "Prasad Distribution",
      ],
    },
    {
      id: 2,
      name: "Saraswati Puja",
      hindiName: "सरस्वती पूजा",
      description: "Goddess of Knowledge and Wisdom worship ceremony",
      hindiDescription: "ज्ञान और बुद्धि की देवी की पूजा समारोह",
      logo: "/SarsawatiLogo.jpeg",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      price: "₹5,000",
      duration: "1 Day",
      features: [
        "Saraswati Vandana",
        "Vidya Aarambh Ceremony",
        "Book & Pen Puja",
        "Educational Blessings",
        "Prasad Distribution",
      ],
    },
    {
      id: 3,
      name: "Chath Puja",
      hindiName: "छठ पूजा",
      description: "Four-day Sun God worship festival",
      hindiDescription: "चार दिनों का सूर्य देवता पूजा उत्सव",
      logo: "/chhatLogo.jpeg",
      icon: <Sun className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      price: "₹8,000",
      duration: "4 Days",
      features: [
        "Nahay Khay Ritual",
        "Kharna Ceremony",
        "Sandhya Arghya",
        "Usha Arghya",
        "Traditional Prasad",
      ],
    },
    {
      id: 4,
      name: "Laxmi Pujan",
      hindiName: "लक्ष्मी पूजन",
      description: "Goddess Lakshmi worship for wealth and prosperity",
      hindiDescription: "धन और समृद्धि के लिए देवी लक्ष्मी की पूजा",
      logo: "/durgaMaaLogo.jpeg", // Using durga logo as placeholder for Laxmi
      icon: <Star className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      price: "₹2,100",
      duration: "1 Day",
      features: [
        "Lakshmi Aarti",
        "Wealth Mantras",
        "Gold Coin Offering",
        "Prosperity Blessings",
        "Sacred Prasad",
      ],
    },
    {
      id: 5,
      name: "Griha Pujan",
      hindiName: "गृह पूजन",
      description: "House warming and blessing ceremony",
      hindiDescription: "घर की शुद्धता और आशीर्वाद समारोह",
      logo: "/bhumiPujanLogo.jpeg",
      icon: <Flame className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      price: "₹2,100",
      duration: "1 Day",
      features: [
        "Vastu Shanti",
        "Home Blessing",
        "Ganesh Puja",
        "Sacred Fire Ceremony",
        "Prosperity Mantras",
      ],
    },
    {
      id: 6,
      name: "Mahadev Puja",
      hindiName: "महादेव पूजा",
      description: "Lord Shiva worship for spiritual enlightenment",
      hindiDescription: "आध्यात्मिक ज्ञान के लिए भगवान शिव की पूजा",
      logo: "/sankar.jpeg",
      icon: <Zap className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      price: "₹2,100",
      duration: "1 Day",
      features: [
        "Rudra Abhishek",
        "Om Namah Shivaya Chanting",
        "Bilva Patra Offering",
        "Shiva Mantras",
        "Sacred Prasad",
      ],
    },
    {
      id: 7,
      name: "Pitra Santi Sardha Karam Puja",
      hindiName: "पितृ शांति श्राद्ध कर्म पूजा",
      description: "Ancestral peace and remembrance ceremony",
      hindiDescription: "पूर्वजों की शांति और स्मरण समारोह",
      logo: "pitaDosh.jpeg",
      icon: <Moon className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      price: "₹6,000",
      duration: "1 Day",
      features: [
        "Pitra Tarpan",
        "Shraddha Ceremony",
        "Pind Daan",
        "Ancestral Blessings",
        "Peace Offering",
      ],
    },
    {
      id: 8,
      name: "Satyanarayan Bhagwan Puja with Hawan",
      hindiName: "सत्यनारायण भगवान पूजा हवन के साथ",
      description: "Lord Satyanarayan worship with sacred fire ceremony",
      hindiDescription: "पवित्र अग्नि समारोह के साथ भगवान सत्यनारायण की पूजा",
      logo: "satnarayanBhagwanLogo.jpg", // Using hanuman as placeholder
      icon: <Flame className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      price: "₹7,000",
      duration: "1 Day",
      features: [
        "Satyanarayan Katha",
        "Sacred Hawan",
        "Mantra Chanting",
        "Divine Blessings",
        "Sacred Prasad",
      ],
    },
  ];

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission logic here
    alert(t("pujaBooking.bookingSubmitted"));
    setSelectedPuja(null);
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      address: "",
      specialRequests: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
            {t("pujaBooking.title")}
          </h1>
          <p className="text-xl text-orange-100">{t("pujaBooking.subtitle")}</p>
        </div>
      </div>

      {/* Puja Cards Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {t("pujaBooking.availableServices")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("pujaBooking.chooseFromCollection")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pujaTypes.map((puja) => (
              <div
                key={puja.id}
                className={`${puja.bgColor} ${puja.borderColor} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
                onClick={() => setSelectedPuja(puja)}
              >
                {/* Logo and Header */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 shadow-lg relative">
                    {!imageErrors[puja.id] ? (
                      <img
                        src={puja.logo}
                        alt={puja.name}
                        className="w-full h-full object-cover"
                        onError={() => {
                          setImageErrors((prev) => ({
                            ...prev,
                            [puja.id]: true,
                          }));
                        }}
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-r ${puja.color} text-white flex items-center justify-center`}
                      >
                        {puja.icon}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {puja.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-devanagari">
                    {puja.hindiName}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 text-center">
                  {puja.description}
                </p>

                {/* Price and Duration */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">
                      {puja.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("pujaBooking.startingPrice")}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-800">
                      {puja.duration}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("pujaBooking.duration")}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t("pujaBooking.includes")}
                  </h4>
                  <ul className="space-y-1">
                    {puja.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 flex items-center"
                      >
                        <Heart className="w-3 h-3 text-red-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Button */}
                <button
                  className={`w-full py-3 px-4 bg-gradient-to-r ${puja.color} text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPuja(puja);
                  }}
                >
                  {t("pujaBooking.bookNow")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedPuja && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {t("pujaBooking.bookPuja")} {selectedPuja.name}
                  </h3>
                  <p className="text-gray-600">{selectedPuja.hindiName}</p>
                </div>
                <button
                  onClick={() => setSelectedPuja(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Puja Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">
                    {t("pujaBooking.price")}
                  </span>
                  <span className="text-xl font-bold text-orange-600">
                    {selectedPuja.price}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">
                    {t("pujaBooking.duration")}:
                  </span>
                  <span>{selectedPuja.duration}</span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">
                    {t("pujaBooking.description")}
                  </span>
                  <p className="text-gray-700 mt-1">
                    {selectedPuja.description}
                  </p>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      {t("pujaBooking.fullName")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t("pujaBooking.enterFullName")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      {t("pujaBooking.phoneNumber")} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t("pujaBooking.enterPhoneNumber")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      {t("pujaBooking.emailAddress")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t("pujaBooking.enterEmail")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {t("pujaBooking.preferredDate")} *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {t("pujaBooking.preferredTime")} *
                    </label>
                    <select
                      name="time"
                      value={bookingForm.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">{t("pujaBooking.selectTime")}</option>
                      <option value="morning">
                        {t("pujaBooking.morning")}
                      </option>
                      <option value="afternoon">
                        {t("pujaBooking.afternoon")}
                      </option>
                      <option value="evening">
                        {t("pujaBooking.evening")}
                      </option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {t("pujaBooking.address")} *
                    </label>
                    <textarea
                      name="address"
                      value={bookingForm.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t("pujaBooking.enterCompleteAddress")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("pujaBooking.specialRequests")}
                    </label>
                    <textarea
                      name="specialRequests"
                      value={bookingForm.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t("pujaBooking.anySpecialRequests")}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedPuja(null)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t("pujaBooking.cancel")}
                  </button>
                  <button
                    type="submit"
                    className={`px-8 py-2 bg-gradient-to-r ${selectedPuja.color} text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    {t("pujaBooking.submitBookingRequest")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PujaBooking;
