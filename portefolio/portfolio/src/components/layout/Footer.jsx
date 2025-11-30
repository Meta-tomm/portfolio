import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themecontext";
import { Link } from "react-router-dom";

// Footer component with links et copyright
function Footer() {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <footer
      className={`border-t py-8 ${
        isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Tom-Mathis Chapuis-Butel
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("footer.description")}
            </p>
          </div>

          {/* Quick navigation */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {t("nav.skills")}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {t("nav.projects")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                tommathischapuis@gmail.com
              </li>
              <li className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                06 76 00 17 76
              </li>
              <li className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Lyon, France
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/Meta-tomm"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tom-mathis-chapuis-butel-6b344830a"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright with admin link */}
        <div className={`text-center pt-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Tom-Mathis Chapuis-Butel. {t("footer.rights")}{' '}
            <Link
              to="/admin"
              className={`opacity-50 hover:opacity-100 transition-opacity ${
                isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              •
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
