import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themecontext";
import { useScrollAnimation } from "../../hooks/UseScrollAnimation";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../../config/emailjs";

// Contact section with form connected to EmailJS
function Contact() {
  const [ref, isVisible] = useScrollAnimation();
  const { isDark } = useTheme();
  const { t } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Form status: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState("idle");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact.form.validation.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.form.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.form.validation.emailInvalid");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("contact.form.validation.subjectRequired");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.form.validation.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setStatus("sending");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Tom Mathis Chapuis", // Your name
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      setStatus("success");
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");

      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  const contactInfo = [
    {
      label: t("about.email"),
      value: "tommathischapuis@gmail.com",
      href: "mailto:tommathischapuis@gmail.com",
    },
    {
      label: t("about.phone"),
      value: "06 76 00 17 76",
      href: "tel:0676001776",
    },
    {
      label: t("contact.location"),
      value: "Lyon / La Boisse, France",
      href: null,
    },
    {
      label: t("contact.availability"),
      value: t("contact.availabilityValue"),
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative min-h-screen py-20 transition-all duration-1000 overflow-hidden ${
        isDark ? "bg-black" : "bg-gray-50"
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}
          style={{ top: "20%", right: "10%" }}
        />
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ bottom: "20%", left: "10%" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("contact.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          <p
            className={`mt-6 max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact information cards */}
          <div className="space-y-6">
            <h3
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("contact.info")}
            </h3>

            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                  isDark
                    ? "bg-white/5 border border-white/10 hover:bg-white/10"
                    : "bg-white shadow-md hover:shadow-xl border border-gray-100"
                }`}
              >
                <div className="flex-1">
                  <p
                    className={`text-sm mb-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className={`font-medium hover:text-blue-500 transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p
                      className={`font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {info.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Social media links */}
            <div className="pt-6">
              <p
                className={`text-sm mb-4 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("contact.findMe")}
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Meta-tomm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium hover:scale-105 ${
                    isDark
                      ? "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                      : "bg-white text-gray-900 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/tom-mathis-chapuis-butel-6b344830a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium hover:scale-105 ${
                    isDark
                      ? "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                      : "bg-white text-gray-900 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact form - validation à ajouter */}
          <div
            className={`p-8 rounded-2xl backdrop-blur-sm ${
              isDark
                ? "bg-white/5 border border-white/10"
                : "bg-white shadow-xl border border-gray-100"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("contact.sendMessage")}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className={`block text-sm mb-2 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                    errors.name ? "border-red-500" : ""
                  } ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  placeholder={t("contact.form.namePlaceholder")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm mb-2 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                    errors.email ? "border-red-500" : ""
                  } ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  placeholder={t("contact.form.emailPlaceholder")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm mb-2 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("contact.form.subject")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                    errors.subject ? "border-red-500" : ""
                  } ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  placeholder={t("contact.form.subjectPlaceholder")}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm mb-2 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("contact.form.message")}
                </label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none ${
                    errors.message ? "border-red-500" : ""
                  } ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  placeholder={t("contact.form.messagePlaceholder")}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl">
                  <p className="text-green-500 text-center font-medium">
                    {t("contact.form.success")}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
                  <p className="text-red-500 text-center font-medium">
                    {t("contact.form.error")}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-medium hover:scale-105 flex items-center justify-center gap-2 ${
                  status === "sending"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {status === "sending"
                  ? t("contact.form.sending")
                  : t("contact.form.send")}
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
