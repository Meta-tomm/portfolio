import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themecontext";

function Hero() {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars for the night theme
    // Note: j'ai mis 100 étoiles mais peut-être trop ? à tester sur mobile
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-gray-900 via-blue-900 to-black"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-50"
      }`}
    >
      {/* Animated stars - only visible in dark mode */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-float ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ top: "10%", left: "10%" }}
        />
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-float-delayed ${
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge with pulsing dot */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8 animate-fade-in">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span
            className={`text-sm font-medium ${
              isDark ? "text-blue-300" : "text-blue-600"
            }`}
          >
            {t("contact.availabilityValue")}
          </span>
        </div>

        {/* Greeting text */}
        <p
          className={`text-lg mb-4 animate-fade-in-up ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          {t("hero.greeting")}
        </p>

        {/* Main name with gradient effect */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up ${
            isDark ? "text-white" : "text-gray-900"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Tom-Mathis
          </span>
          <br />
          <span className={isDark ? "text-white" : "text-gray-900"}>
            Chapuis-Butel
          </span>
        </h1>

        {/* Job title */}
        <h2
          className={`text-2xl md:text-4xl mb-6 animate-fade-in-up ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          {t("hero.title")}
        </h2>

        {/* Short description */}
        <p
          className={`text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
          style={{ animationDelay: "0.5s" }}
        >
          {t("hero.description")}
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#projects"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-medium hover:scale-105"
          >
            <span className="flex items-center gap-2">
              {t("hero.viewProjects")}
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>
          <a
            href="#contact"
            className={`px-8 py-4 border-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? "border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
                : "border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
          >
            {t("hero.contactMe")}
          </a>
        </div>

        {/* Social media links - TODO: maybe add more social platforms later? */}
        <div
          className="flex gap-4 justify-center mt-12 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="https://github.com/Meta-tomm"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              isDark
                ? "bg-gray-800/50 hover:bg-gray-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/tom-mathis-chapuis-butel-6b344830a"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              isDark
                ? "bg-gray-800/50 hover:bg-gray-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:tommathischapuis@gmail.com"
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              isDark
                ? "bg-gray-800/50 hover:bg-gray-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute mt-10 bottom-18 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Scroll
            </span>
            <svg
              className={`w-6 h-6 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
