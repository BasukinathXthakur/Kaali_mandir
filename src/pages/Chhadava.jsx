import React, { useState } from "react";
import {
  MapPin,
  Phone,
  User,
  Mail,
  Calendar,
  Clock,
  Heart,
  Star,
  Gift,
  Flower,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const Chhadava = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    village: "",
    pincode: "",
    contact: "",
    chhadavaType: "",
    date: "",
    time: "",
    specialRequests: "",
  });

  const chhadavaTypes = [
    {
      id: 1,
      name: "Fruit Offering",
      hindiName: "फल चढ़ावा",
      description: "Fresh fruits offering to the deity",
      price: "₹500 - ₹2,000",
      icon: <Gift className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 2,
      name: "Flower Garland",
      hindiName: "फूलों की माला",
      description: "Beautiful flower garlands for decoration",
      price: "₹300 - ₹1,500",
      icon: <Flower className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 3,
      name: "Sweets Offering",
      hindiName: "मिठाई चढ़ावा",
      description: "Traditional sweets and prasad",
      price: "₹200 - ₹1,000",
      icon: <Heart className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 4,
      name: "Special Decoration",
      hindiName: "विशेष सजावट",
      description: "Temple decoration for special occasions",
      price: "₹1,000 - ₹5,000",
      icon: <Star className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: 5,
      name: "Gold/Silver Items",
      hindiName: "सोना/चांदी की वस्तुएं",
      description: "Precious metal offerings",
      price: "₹2,000 - ₹10,000",
      icon: <Star className="w-6 h-6" />,
      color: "from-yellow-600 to-amber-600",
    },
    {
      id: 6,
      name: "Cloth/Saree",
      hindiName: "कपड़े/साड़ी",
      description: "Traditional clothes for deity",
      price: "₹500 - ₹3,000",
      icon: <Gift className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Chhadava booking request submitted successfully!");
    setFormData({
      name: "",
      village: "",
      pincode: "",
      contact: "",
      chhadavaType: "",
      date: "",
      time: "",
      specialRequests: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
            चढ़ावा सेवा
          </h1>
          <p className="text-xl text-purple-100">
            Offer your devotion to the divine with sacred offerings
          </p>
        </div>
      </div>

      {/* Chhadava Types Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              चढ़ावा के प्रकार
            </h2>
            <p className="text-gray-600 text-lg">
              Choose from various offering types for your devotion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {chhadavaTypes.map((type) => (
              <div
                key={type.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-purple-200"
              >
                <div className="text-center mb-4">
                  <div
                    className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${type.color} text-white flex items-center justify-center mb-3`}
                  >
                    {type.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-devanagari">
                    {type.hindiName}
                  </p>
                </div>
                <p className="text-gray-700 text-center mb-3">
                  {type.description}
                </p>
                <p className="text-center font-semibold text-purple-600">
                  {type.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                चढ़ावा बुकिंग फॉर्म
              </h2>
              <p className="text-gray-600">
                Fill out the form below to book your offering
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 rounded-xl p-8 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    नाम / Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="अपना पूरा नाम लिखें"
                  />
                </div>

                {/* Village Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    गांव / Village *
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="गांव का नाम लिखें"
                  />
                </div>

                {/* Pincode Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    पिनकोड / Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{6}"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="6 अंकों का पिनकोड"
                  />
                </div>

                {/* Contact Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    संपर्क नंबर / Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="10 अंकों का मोबाइल नंबर"
                  />
                </div>

                {/* Chhadava Type Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Gift className="w-4 h-4 inline mr-1" />
                    क्या चढ़ावा है / What is the offering? *
                  </label>
                  <select
                    name="chhadavaType"
                    value={formData.chhadavaType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">चढ़ावा का प्रकार चुनें</option>
                    {chhadavaTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name} - {type.hindiName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    पसंदीदा तारीख / Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Time Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    पसंदीदा समय / Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">समय चुनें</option>
                    <option value="morning">
                      सुबह / Morning (6:00 AM - 12:00 PM)
                    </option>
                    <option value="afternoon">
                      दोपहर / Afternoon (12:00 PM - 6:00 PM)
                    </option>
                    <option value="evening">
                      शाम / Evening (6:00 PM - 10:00 PM)
                    </option>
                  </select>
                </div>

                {/* Special Requests Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    विशेष निवेदन / Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="कोई विशेष बात या निवेदन हो तो लिखें..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  चढ़ावा बुकिंग सबमिट करें
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">महत्वपूर्ण जानकारी</h3>
            <p className="text-purple-200">चढ़ावा सेवा के लिए आवश्यक जानकारी</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <h4 className="font-semibold mb-1">समय सीमा</h4>
              <p className="text-purple-200">
                कम से कम 24 घंटे पहले बुकिंग करें
              </p>
            </div>
            <div>
              <Phone className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <h4 className="font-semibold mb-1">संपर्क करें</h4>
              <p className="text-purple-200">
                किसी भी प्रश्न के लिए +91 98765 43210
              </p>
            </div>
            <div>
              <Heart className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <h4 className="font-semibold mb-1">श्रद्धा और भक्ति</h4>
              <p className="text-purple-200">
                सभी चढ़ावा श्रद्धा के साथ चढ़ाया जाता है
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chhadava;
