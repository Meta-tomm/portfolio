import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./context/themecontext.tsx";
import "./i18n";
import "./index.css";

// Lazy load pages to reduce initial bundle size
const Admin = lazy(() => import("./pages/Admin.tsx"));
const ProjectDetail = lazy(() => import("./pages/projects/ProjectDetail.tsx"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-gray-900 dark:text-white">Chargement...</div>
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Admin />
              </Suspense>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ProjectDetail />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
