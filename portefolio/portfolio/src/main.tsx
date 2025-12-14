import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/themecontext.jsx";
import "./i18n";
import "./index.css";

// Lazy load Admin page to reduce initial bundle size
const Admin = lazy(() => import("./pages/Admin.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  <div className="text-gray-900 dark:text-white">Chargement...</div>
                </div>
              }>
                <Admin />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
