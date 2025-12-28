import { useState } from "react";
import { useTheme } from "../../context/themecontext";
import { Maximize2, AlertCircle } from "lucide-react";

interface PowerBIDashboardProps {
  embedUrl?: string;
  reportId?: string;
  fallbackImage?: string;
  title: string;
  description?: string;
}

// Power BI Dashboard embed component
// Falls back to screenshot if no embed URL provided
export function PowerBIDashboard({
  embedUrl,
  reportId,
  fallbackImage,
  title,
  description,
}: PowerBIDashboardProps) {
  const { isDark } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // For now, use fallback mode until Power BI Service is configured
  // TODO: Implement Power BI embed with authentication when dashboards are ready
  const useFallback = !embedUrl || !reportId;

  if (useFallback && fallbackImage) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {title}
            </h3>
            {description && (
              <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsFullscreen(true)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
            title="View fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Preview */}
        <div
          className={`relative rounded-xl overflow-hidden border ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {!imageError ? (
            <img
              src={fallbackImage}
              alt={`${title} dashboard preview`}
              className="w-full h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setIsFullscreen(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className={`flex flex-col items-center justify-center h-96 ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <AlertCircle className={`w-12 h-12 mb-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Dashboard preview not available
              </p>
              <p className={`text-sm mt-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                Power BI integration coming soon
              </p>
            </div>
          )}

          {/* Badge indicating mockup */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/90 text-white text-xs font-semibold rounded-full">
            Dashboard Preview
          </div>
        </div>

        {/* Fullscreen Modal */}
        {isFullscreen && !imageError && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300"
              onClick={() => setIsFullscreen(false)}
            >
              ×
            </button>
            <img
              src={fallbackImage}
              alt={`${title} dashboard fullscreen`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    );
  }

  // Power BI Embed Mode (not yet implemented)
  // TODO: Implement with powerbi-client-react when dashboards are published
  return (
    <div
      className={`flex flex-col items-center justify-center h-96 rounded-xl border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"
      }`}
    >
      <AlertCircle className={`w-12 h-12 mb-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
      <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
        Power BI Integration
      </p>
      <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Configure Power BI Service to enable interactive dashboards
      </p>
    </div>
  );
}
