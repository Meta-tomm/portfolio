import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Project";
import Skills from "./components/sections/Skills";
import CommentsSection from "./components/sections/CommentsSection";
import ScrollToTop from "./components/ui/ScrollToTop.jsx";

// TODO: ajouter React Router pour navigation future ?
function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CommentsSection />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
