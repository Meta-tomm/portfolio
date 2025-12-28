import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themecontext";
import { useScrollAnimation } from "../../hooks/UseScrollAnimation";
import { ProjectCard } from "../ui/ProjectCard";

// Projects section with data from backend API
function ProjectsNew() {
  const [ref, isVisible] = useScrollAnimation();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiUrl}/projects`);

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setProjects(data.data.map((p: any) => ({
              id: p._id,
              title: p.title,
              description: p.description,
              technologies: p.tags,
              github: p.github,
              demo: p.demo,
              status: p.status,
              gradient: p.gradient
            })));
          }
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();

    // Listen for custom events (project updates)
    const handleProjectsUpdated = () => {
      loadProjects();
    };

    window.addEventListener("projectsUpdated", handleProjectsUpdated);

    return () => {
      window.removeEventListener("projectsUpdated", handleProjectsUpdated);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className={`relative min-h-screen py-20 transition-all duration-1000 overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-white"
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ top: "30%", left: "10%" }}
        />
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}
          style={{ bottom: "30%", right: "10%" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("projects.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4" />
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Data Analysis, Business Intelligence & Full-Stack Development
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || `project-${index}`}
              id={project.hasDetailPage ? project.id : undefined}
              title={project.title}
              description={project.description}
              technologies={project.technologies || []}
              github={project.github}
              demo={project.demo}
              gradient={project.gradient}
              status={project.status}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16">
            <div className={`w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4 ${
              isDark ? "border-gray-700 border-t-blue-500" : "border-gray-200 border-t-blue-600"
            }`} />
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Loading projects...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-16">
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              No projects available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsNew;
