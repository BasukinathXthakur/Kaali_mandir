import React, { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Download,
  BookOpen,
  Calendar,
  Star,
  Maximize2,
  Minimize2,
} from "lucide-react";

const BhagavadGita = () => {
  const [scale, setScale] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 10, 200));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 10, 50));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/bhagwatGita.pdf";
    link.download = "Bhagavad-Gita.pdf";
    link.click();
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      <div
        className={`container mx-auto px-4 py-8 ${
          isFullscreen ? "h-full overflow-hidden" : ""
        }`}
      >
        {/* Header */}
        {!isFullscreen && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full mb-6">
              <span className="text-3xl">📖</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              श्रीमद्भगवद्गीता
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              The Song of God - Complete Text
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                Part of Mahabharata
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Ancient Text
              </span>
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Sacred Scripture
              </span>
            </div>
          </div>
        )}

        {/* PDF Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={zoomOut}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>

              <span className="px-3 py-2 bg-gray-100 rounded-lg font-medium min-w-[60px] text-center">
                {scale}%
              </span>

              <button
                onClick={zoomIn}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Additional Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={downloadPDF}
                className="p-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div
          className={`bg-white rounded-2xl shadow-lg p-6 ${
            isFullscreen ? "h-[calc(100vh-200px)] overflow-auto" : ""
          }`}
        >
          <div className="flex justify-center">
            <iframe
              src="/bhagwatGita.pdf#toolbar=1&navpanes=1&scrollbar=1"
              width="100%"
              height={isFullscreen ? "calc(100vh - 300px)" : "800px"}
              style={{
                transform: `scale(${scale / 100})`,
                transformOrigin: "top center",
                width: `${100 / (scale / 100)}%`,
                height: `${800 / (scale / 100)}px`,
              }}
              className="border-0 rounded-lg shadow-lg"
              title="Bhagavad Gita PDF"
            />
          </div>
        </div>

        {/* Alternative Download Link */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-lg shadow-lg p-4">
            <span className="text-gray-600">Having trouble viewing? </span>
            <button
              onClick={downloadPDF}
              className="text-blue-600 font-medium hover:text-blue-700 underline"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BhagavadGita;
