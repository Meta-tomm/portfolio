import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themecontext";
import { useScrollAnimation } from "../../hooks/UseScrollAnimation";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import ImageGalleryModal from "../ui/ImageGalleryModal";

function Projects() {
  const [ref, isVisible] = useScrollAnimation();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      const defaultProjects = [
    {
      id: 1,
      title: "Indeed Be Like",
      description:
        "Clone d'Indeed - Plateforme de recherche d'emploi avec système de candidatures et gestion des offres. Interface moderne et responsive.",
      technologies: ["React", "Node.js", "JavaScript", "Tailwind"],
      github: "https://github.com/Meta-tomm/Site.git",
      demo: null,
      status: "inProgress",
      gradient: "from-blue-500 to-cyan-500",
      hasGallery: true,
      screenshots: [
        {
          url: "/projects/indeed-screenshots/home.png",
          alt: "Dashboard Client Indeed Be Like",
          caption: "Dashboard client - Gestion des candidatures et profil",
        },
        {
          url: "/projects/indeed-screenshots/search.png",
          alt: "Interface de Swipe",
          caption: "Système de swipe pour parcourir les offres d'emploi",
        },
        {
          url: "/projects/indeed-screenshots/job-detail.png",
          alt: "Dashboard Entreprise",
          caption: "Dashboard entreprise - Gestion des offres et candidatures",
        },
        {
          url: "/projects/indeed-screenshots/application.png",
          alt: "Système de messagerie",
          caption: "Interface de messagerie entre candidats et entreprises",
        },
      ],
    },
    {
      id: 2,
      title: "Portfolio Professionnel",
      description:
        "Portfolio personnel moderne avec animations fluides, construit avec React et Tailwind CSS. Design minimaliste et performant.",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/Meta-tomm/portfolio",
      demo: null,
      status: "inProgress",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Système de Gestion Hospitalière",
      description:
        "Projet académique - Application de gestion de données médicales respectant les normes FHIR/HL7 et RGPD.",
      technologies: ["C#", ".NET", "MySQL", "FHIR/HL7"],
      github: null,
      demo: null,
      status: "academic",
      gradient: "from-green-500 to-emerald-500",
    },
  ];
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
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
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("projects.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <CardContainer
              key={project.id}
              className="inter-var"
              containerClassName="w-full"
            >
              <CardBody
                className={`relative group/card w-full h-auto rounded-xl p-6 border transition-all duration-500 flex flex-col ${
                  isDark
                    ? "bg-gray-800/50 border-white/[0.2] hover:shadow-2xl hover:shadow-emerald-500/[0.1]"
                    : "bg-white border-black/[0.1] shadow-xl hover:shadow-2xl"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <CardItem translateZ="50" className="w-full">
                  <div
                    className={`h-2 rounded-t-xl bg-gradient-to-r ${project.gradient}`}
                  ></div>
                </CardItem>

                <div className="flex justify-between items-start mt-4 mb-4 gap-3">
                  <CardItem translateZ="50" className="flex-1">
                    <h3
                      className={`text-xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </CardItem>

                  <CardItem translateZ="50" className="flex-shrink-0">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                        isDark
                          ? "bg-blue-600/20 text-blue-400"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {t(`projects.status.${project.status}`)}
                    </span>
                  </CardItem>
                </div>

                <CardItem
                  as="p"
                  translateZ="60"
                  className={`text-sm mb-4 leading-relaxed ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </CardItem>

                <CardItem translateZ="100" className="w-full mb-4 flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          isDark
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardItem>

                <CardItem
                  translateZ="120"
                  className="w-full flex flex-col gap-3 mt-auto"
                >
                  {project.hasGallery && (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-lg hover:shadow-lg transition-all text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Voir les captures
                    </button>
                  )}

                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 px-4 py-2 text-center rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                          isDark
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-white text-gray-900 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-lg hover:shadow-lg transition-all text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Demo
                      </a>
                    )}
                    {!project.github && !project.demo && !project.hasGallery && (
                      <span
                        className={`flex-1 px-4 py-2 text-center rounded-lg text-sm font-medium ${
                          isDark
                            ? "bg-gray-800 text-gray-500"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        Privé
                      </span>
                    )}
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/Meta-tomm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-medium hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {t("projects.viewMore")}
          </a>
        </div>
      </div>

      {selectedProject && selectedProject.hasGallery && (
        <ImageGalleryModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          images={selectedProject.screenshots}
          projectTitle={selectedProject.title}
        />
      )}
    </section>
  );
}

export default Projects;
