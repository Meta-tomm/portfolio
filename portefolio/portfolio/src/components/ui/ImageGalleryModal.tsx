import { useEffect, useState } from "react";
import { useTheme } from "@context/themecontext";

interface Screenshot {
  url: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Screenshot[];
  projectTitle: string;
}

function ImageGalleryModal({ isOpen, onClose, images, projectTitle }: ImageGalleryModalProps) {
  const { isDark } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentImageIndex];
  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`absolute inset-0 backdrop-blur-sm ${
          isDark ? "bg-black/80" : "bg-black/60"
        }`}
      />

      <div
        className={`relative max-w-6xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {projectTitle}
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
            aria-label="Close gallery"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="relative p-8">
          <div className="flex items-center justify-center">
            <img
              src={currentImage.url}
              alt={currentImage.alt}
              className="max-h-[60vh] w-auto rounded-lg shadow-lg object-contain"
            />
          </div>

          {currentImage.caption && (
            <p
              className={`text-center mt-4 text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {currentImage.caption}
            </p>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-900 shadow-lg"
                }`}
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-900 shadow-lg"
                }`}
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div
            className={`flex gap-2 p-6 overflow-x-auto border-t ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                  index === currentImageIndex
                    ? "ring-2 ring-blue-500 scale-110"
                    : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute top-20 right-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDark
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {currentImageIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageGalleryModal;
