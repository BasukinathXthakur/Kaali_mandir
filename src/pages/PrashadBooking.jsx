import React, { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Gift,
  Clock,
  Star,
  Heart,
  CheckCircle,
  XCircle,
  Truck,
  Home,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const PrashadBooking = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);
  const [mahaprasadForm, setMahaprasadForm] = useState({
    name: "",
    phone: "",
    fatherName: "",
  });
  const [prashadForm, setPrashadForm] = useState({
    name: "",
    phone: "",
    village: "",
    pincode: "",
    address: "",
  });

  const services = [
    {
      id: 1,
      name: "Mahaprasad",
      description: "Sacred blessed food from the temple",
      hindiDescription: "मंदिर से पवित्र आशीर्वादित भोजन",
      maithiliDescription: "मंदिर स पवित्र आशीर्वादित भोजन",
      icon: <Star className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      price: "₹101",
      features: [
        t("prashadBooking.mahaprasadFeatures.sameVillage"),
        t("prashadBooking.mahaprasadFeatures.sacredFood"),
        t("prashadBooking.mahaprasadFeatures.traditionalPrep"),
        t("prashadBooking.mahaprasadFeatures.divineBlessings"),
      ],
      restrictions: t("prashadBooking.mahaprasadRestriction"),
    },
    {
      id: 2,
      name: "Prashad",

      description: "Blessed offerings for all devotees",
      hindiDescription: "सभी भक्तों के लिए आशीर्वादित प्रसाद",
      maithiliDescription: "सभी भक्त के लेल आशीर्वादित प्रसाद",
      icon: <Gift className="w-8 h-8" />,
      color: "from-green-500 to-blue-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      price: "Free",
      features: [
        t("prashadBooking.prashadFeatures.deliveryRange"),
        t("prashadBooking.prashadFeatures.freeForAll"),
        t("prashadBooking.prashadFeatures.blessedOfferings"),
        t("prashadBooking.prashadFeatures.homeDelivery"),
      ],
      restrictions: t("prashadBooking.prashadRestriction"),
    },
  ];

  const handleMahaprasadInputChange = (e) => {
    setMahaprasadForm({
      ...mahaprasadForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrashadInputChange = (e) => {
    setPrashadForm({
      ...prashadForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleMahaprasadSubmit = (e) => {
    e.preventDefault();
    alert(t("prashadBooking.mahaprasadSubmitted"));
    setSelectedService(null);
    setMahaprasadForm({
      name: "",
      phone: "",
      fatherName: "",
    });
  };

  const handlePrashadSubmit = (e) => {
    e.preventDefault();
    alert(t("prashadBooking.prashadSubmitted"));
    setSelectedService(null);
    setPrashadForm({
      name: "",
      phone: "",
      village: "",
      pincode: "",
      address: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
            {t("prashadBooking.title")}
          </h1>
          <p className="text-xl text-orange-100">
            {t("prashadBooking.subtitle")}
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              {t("prashadBooking.availableServices")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("prashadBooking.chooseFromCollection")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                className={`${service.bgColor} ${service.borderColor} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
                onClick={() => setSelectedService(service)}
              >
                {/* Icon and Header */}
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${service.color} text-white flex items-center justify-center mb-4`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-devanagari">
                    {service.hindiName}
                  </p>
                  <p className="text-sm text-gray-600 font-devanagari">
                    {service.maithiliName}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 text-center">
                  {service.description}
                </p>

                {/* Price */}
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-gray-800">
                    {service.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("prashadBooking.price")}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t("prashadBooking.includes")}
                  </h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
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

                {/* Restrictions */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t("prashadBooking.deliveryArea")}
                  </h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-3 h-3 text-blue-500 mr-2" />
                    {service.restrictions}
                  </p>
                </div>

                {/* Book Button */}
                <button
                  className={`w-full py-3 px-4 bg-gradient-to-r ${service.color} text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                >
                  {t("prashadBooking.bookNow")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mahaprasad Booking Modal */}
      {selectedService && selectedService.id === 1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {t("prashadBooking.bookMahaprasad")}
                  </h3>
                  <p className="text-gray-600">{selectedService.hindiName}</p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Service Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">
                    {t("prashadBooking.price")}
                  </span>
                  <span className="text-xl font-bold text-orange-600">
                    {selectedService.price}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">
                    {t("prashadBooking.description")}
                  </span>
                  <p className="text-gray-700 mt-1">
                    {selectedService.description}
                  </p>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-red-600">
                    {t("prashadBooking.restriction")}
                  </span>
                  <p className="text-red-600 mt-1">
                    {selectedService.restrictions}
                  </p>
                </div>
              </div>

              {/* Mahaprasad Form */}
              <form onSubmit={handleMahaprasadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      {t("prashadBooking.fullName")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={mahaprasadForm.name}
                      onChange={handleMahaprasadInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t("prashadBooking.enterFullName")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      {t("prashadBooking.phoneNumber")} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={mahaprasadForm.phone}
                      onChange={handleMahaprasadInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t("prashadBooking.enterPhoneNumber")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      {t("prashadBooking.fatherName")} *
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={mahaprasadForm.fatherName}
                      onChange={handleMahaprasadInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t("prashadBooking.enterFatherName")}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t("prashadBooking.cancel")}
                  </button>
                  <button
                    type="submit"
                    className={`px-8 py-2 bg-gradient-to-r ${selectedService.color} text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    {t("prashadBooking.submitBookingRequest")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Prashad Booking Modal */}
      {selectedService && selectedService.id === 2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {t("prashadBooking.bookPrashad")}
                  </h3>
                  <p className="text-gray-600">{selectedService.hindiName}</p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Service Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">
                    {t("prashadBooking.price")}
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {selectedService.price}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">
                    {t("prashadBooking.description")}
                  </span>
                  <p className="text-gray-700 mt-1">
                    {selectedService.description}
                  </p>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-blue-600">
                    {t("prashadBooking.deliveryRange")}
                  </span>
                  <p className="text-blue-600 mt-1">
                    {selectedService.restrictions}
                  </p>
                </div>
              </div>

              {/* Prashad Form */}
              <form onSubmit={handlePrashadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      {t("prashadBooking.fullName")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={prashadForm.name}
                      onChange={handlePrashadInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t("prashadBooking.enterFullName")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      {t("prashadBooking.phoneNumber")} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={prashadForm.phone}
                      onChange={handlePrashadInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t("prashadBooking.enterPhoneNumber")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Home className="w-4 h-4 inline mr-1" />
                      {t("prashadBooking.villageName")} *
                    </label>
                    <input
                      type="text"
                      name="village"
                      value={prashadForm.village}
                      onChange={handlePrashadInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t("prashadBooking.enterVillageName")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {t("prashadBooking.pincode")} *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={prashadForm.pincode}
                      onChange={handlePrashadInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t("prashadBooking.enterPincode")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {t("prashadBooking.address")} *
                    </label>
                    <textarea
                      name="address"
                      value={prashadForm.address}
                      onChange={handlePrashadInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t("prashadBooking.enterCompleteAddress")}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t("prashadBooking.cancel")}
                  </button>
                  <button
                    type="submit"
                    className={`px-8 py-2 bg-gradient-to-r ${selectedService.color} text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    {t("prashadBooking.submitBookingRequest")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              {t("prashadBooking.needHelp")}
            </h3>
            <p className="text-gray-300">
              {t("prashadBooking.contactUsQuestions")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold mb-1">
                {t("prashadBooking.phone")}
              </h4>
              <p className="text-gray-300">9334223837</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold mb-1">
                {t("prashadBooking.location")}
              </h4>
              <p className="text-gray-300">26.342225, 86.004515</p>
            </div>
            <div>
              <Truck className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold mb-1">
                {t("prashadBooking.delivery")}
              </h4>
              <p className="text-gray-300">
                {t("prashadBooking.deliveryInfo")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrashadBooking;
