import React, { useState } from "react";
import {
  Camera,
  Heart,
  Star,
  Download,
  Share2,
  Filter,
  Grid,
  List,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const Gallery = () => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Gallery images from public folder
  const galleryImages = [
    {
      id: 1,
      src: "/gallery1.jpg",
    },
    {
      id: 2,
      src: "/gallery2.jpg",
    },
    {
      id: 3,
      src: "/gallery3.jpg",
      category: "temple",
    },
    {
      id: 4,
      src: "/gallery4.jpg",
      category: "temple",
    },
    {
      id: 5,
      src: "/gallery5.jpg",
      category: "temple",
    },
    {
      id: 6,
      src: "/gallery6.jpg",
      category: "temple",
    },
    {
      id: 7,
      src: "/gallary7.jpg",
      category: "temple",
    },
    {
      id: 8,
      src: "/gallary8.jpg",
      category: "temple",
    },
    {
      id: 9,
      src: "/gallary9.jpg",
      category: "temple",
    },
    {
      id: 10,
      src: "/gallary10.jpg",
      category: "temple",
    },
    {
      id: 11,
      src: "/gallary 11.jpg",
      category: "temple",
    },
    {
      id: 12,
      src: "/gallary12.jpg",
      category: "temple",
    },
    {
      id: 13,
      src: "/gallary13.jpg",
      category: "temple",
    },
    {
      id: 14,
      src: "/gallary 14.jpg",
      category: "temple",
    },
  ];

  const categories = [
    { id: "all", name: "All", hindiName: "सभी", maithiliName: "सभी" },
    { id: "temple", name: "Temple", hindiName: "मंदिर", maithiliName: "मंदिर" },
  ];

  const filteredImages =
    filterCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filterCategory);

  const downloadImage = async (image) => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `temple-gallery-${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Temple Gallery Image",
          text: "Check out this beautiful temple image",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setShowAddPhotoModal(true);
    }
  };

  const handleAddPhoto = () => {
    // In a real app, you would upload to a server
    alert(t("gallery.photoUploaded"));
    setShowAddPhotoModal(false);
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-devanagari">
            {t("gallery.title")}
          </h1>
          <p className="text-xl text-orange-100">{t("gallery.subtitle")}</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Filter Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilterCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filterCategory === category.id
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Add Photo Button */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-dashed border-gray-300 hover:border-orange-500">
                <label
                  htmlFor="photo-upload"
                  className="h-64 flex items-center justify-center bg-gray-50 hover:bg-orange-50 transition-colors cursor-pointer"
                >
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">
                      {t("gallery.addPhoto")}
                    </p>
                  </div>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={`Gallery ${image.id}`}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        console.log("Image failed to load:", image.src);
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="flex space-x-2 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => downloadImage(image)}
                          className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare()}
                          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                        {image.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Add Photo Button for List View */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-300 hover:border-orange-500">
                <div className="flex items-center justify-center h-32 bg-gray-50 hover:bg-orange-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-8 h-8 text-gray-400" />
                    <p className="text-gray-600 font-medium">
                      {t("gallery.addPhoto")}
                    </p>
                  </div>
                </div>
              </div>

              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/3">
                      <img
                        src={image.src}
                        alt={`Gallery ${image.id}`}
                        className="w-full h-48 md:h-32 object-cover"
                        onError={(e) => {
                          console.log("Image failed to load:", image.src);
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                          {image.category}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div className="flex space-x-2 opacity-0 hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => downloadImage(image)}
                            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleShare()}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                            title="Share"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Photo Modal */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {t("gallery.addPhoto")}
              </h3>
              <button
                onClick={() => setShowAddPhotoModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {uploadedFile && (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {uploadedFile.name}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowAddPhotoModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t("gallery.cancel")}
              </button>
              <button
                onClick={handleAddPhoto}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                {t("gallery.upload")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">{t("gallery.needHelp")}</h3>
            <p className="text-gray-300">{t("gallery.contactUsQuestions")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Camera className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold mb-1">{t("gallery.photography")}</h4>
              <p className="text-gray-300">{t("gallery.photographyInfo")}</p>
            </div>
            <div>
              <Star className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold mb-1">{t("gallery.contribute")}</h4>
              <p className="text-gray-300">{t("gallery.contributeInfo")}</p>
            </div>
            <div>
              <Heart className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold mb-1">{t("gallery.support")}</h4>
              <p className="text-gray-300">{t("gallery.supportInfo")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
