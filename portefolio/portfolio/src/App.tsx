import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/ProjectsNew";
import Skills from "./components/sections/SkillsNew";
import Analytics from "./components/sections/Analytics";
import ScrollToTop from "./components/ui/ScrollToTop";
import { useAnalytics } from "./hooks/useAnalytics";

// Main app component with all sections
function App() {
  // Track analytics automatically
  useAnalytics();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Analytics />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
