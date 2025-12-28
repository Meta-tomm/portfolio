import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";
import { useTheme } from "../../context/themecontext";

interface ProjectLayoutProps {
  children: ReactNode;
}

// Layout wrapper for project detail pages
// Includes navigation and footer for consistent UX
export default function ProjectLayout({ children }: ProjectLayoutProps) {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>
      <Navigation />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
