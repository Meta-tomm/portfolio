import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themecontext";
import { useScrollAnimation } from "../../hooks/UseScrollAnimation";

function About() {
  const [ref, isVisible] = useScrollAnimation();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  

  return (
    <section
      id="about"
      ref={ref}
      className={`relative min-h-screen py-20 transition-all duration-1000 overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-white"
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ top: "20%", left: "-10%" }}
        />
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}
          style={{ bottom: "20%", right: "-10%" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("about.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>

              <div className="relative w-64 h-64 rounded-full p-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 transform group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                  <img
                    src="/tom-profile.jpg"
                    alt="Tom Mathis Chapuis"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-20 h-20 border-4 border-blue-500 rounded-full opacity-50 group-hover:rotate-180 transition-transform duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-purple-500 rounded-full opacity-50 group-hover:-rotate-180 transition-transform duration-700"></div>
            </div>
          </div>

          <div className="space-y-6">
            <p
              className={`text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t("about.intro")}
            </p>

            <p
              className={`text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t("about.desc")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {[
                { label: t("about.location"), value: "Lyon, France" },
                { label: t("about.status"), value: t("about.statusValue") },
                {
                  label: t("about.email"),
                  value: "tommathischapuis@gmail.com",
                },
                { label: t("about.phone"), value: "06 76 00 17 76" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50"
                      : "bg-gray-50 border-gray-200 hover:bg-white hover:border-blue-500/50 hover:shadow-blue-500/10"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`font-semibold text-sm ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CV download button */}
            <a
              href="/cv-tom-mathis-chapuis.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-medium hover:scale-105 mt-6"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {t("about.downloadCV")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
