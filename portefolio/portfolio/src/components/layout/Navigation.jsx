import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themecontext";

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDark ? "bg-black/90" : "bg-white/90"
      } backdrop-blur-md transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16 transition-all duration-200">
          <div
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Tom-Mathis
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className={`${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors inline-block text-center min-w-[80px]`}
            >
              {t("nav.home")}
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className={`${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors inline-block text-center min-w-[80px]`}
            >
              {t("nav.about")}
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, 'skills')}
              className={`${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors inline-block text-center min-w-[80px]`}
            >
              {t("nav.skills")}
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className={`${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors inline-block text-center min-w-[80px]`}
            >
              {t("nav.projects")}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors inline-block text-center min-w-[80px]`}
            >
              {t("nav.contact")}
            </a>

            {/* Language Selector */}
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage("fr")}
                className={`w-12 py-1 rounded text-sm font-medium transition-colors ${
                  i18n.language === "fr"
                    ? "bg-blue-600 text-white"
                    : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`w-12 py-1 rounded text-sm font-medium transition-colors ${
                  i18n.language === "en"
                    ? "bg-blue-600 text-white"
                    : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme changer*/}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-200 text-gray-900"
              } hover:scale-110 transition-transform`}
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden md:block">
            <a
              href="/cv-tom-mathis-chapuis.pdf"
              target="_blank"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {t("nav.cv")}
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ${isDark ? "text-white" : "text-gray-900"}`}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`md:hidden ${isDark ? "bg-black/95" : "bg-white/95"}`}>
          <div className="px-4 py-2 space-y-2">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className={`block py-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              } transition-colors`}
            >
              {t("nav.home")}
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className={`block py-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              } transition-colors`}
            >
              {t("nav.about")}
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, 'skills')}
              className={`block py-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              } transition-colors`}
            >
              {t("nav.skills")}
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className={`block py-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              } transition-colors`}
            >
              {t("nav.projects")}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`block py-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              } transition-colors`}
            >
              {t("nav.contact")}
            </a>
            <div className="flex gap-2 py-2">
              <button
                onClick={() => changeLanguage("fr")}
                className={`w-12 py-1 rounded ${
                  i18n.language === "fr"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`w-12 py-1 rounded ${
                  i18n.language === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-200 text-gray-900"
              } hover:scale-110 transition-transform`}
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
