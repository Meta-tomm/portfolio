// EmailJS Configuration
// Get your credentials from: https://dashboard.emailjs.com/

interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export const EMAILJS_CONFIG: EmailJSConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
};
