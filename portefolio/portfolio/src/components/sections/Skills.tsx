import { useTranslation } from "react-i18next";
import {
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
  FaPhp,
} from "react-icons/fa";
import {
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiPostgresql,
  SiTypescript,
  SiSymfony,
  SiPandas,
  SiScikitlearn,
} from "react-icons/si";
import { useTheme } from "../../context/themecontext";
import { useScrollAnimation } from "../../hooks/UseScrollAnimation";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

// Skills section with subtle 3D effect - keeping original compact design
// L'effet 3D est plus subtil, juste pour l'interactivité
function Skills() {
  const [ref, isVisible] = useScrollAnimation();
  const { isDark } = useTheme();
  const { t } = useTranslation();

  // Tech skills with icons and brand colors
  // Organized by focus areas: Frontend, Backend, Data/BI, Databases, DevOps
  const skillsData = [
    // Frontend
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "HTML/CSS", icon: FaHtml5, color: "#E34F26" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    // Backend
    { name: "PHP", icon: FaPhp, color: "#777BB4" },
    { name: "Symfony", icon: SiSymfony, color: "#000000" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    // Data & Analytics
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "Pandas", icon: SiPandas, color: "#150458" },
    { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
    // Databases
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    // DevOps & Tools
    { name: "Docker", icon: FaDocker, color: "#2496ED" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
  ];

  const softSkillsKeys = [
    "adaptation",
    "rigor",
    "teamwork",
    "ethics",
    "confidentiality",
    "english",
  ];

  return (
    <section
      id="skills"
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
          style={{ top: "10%", right: "10%" }}
        />
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ bottom: "10%", left: "10%" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("skills.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Skills grid - compact size with subtle 3D effect */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16">
          {skillsData.map((skill, index) => (
            <CardContainer
              key={skill.name}
              className="inter-var"
              containerClassName="w-full"
            >
              <CardBody
                className={`relative group/card w-full h-auto rounded-2xl p-6 border transition-all duration-300 hover:scale-110 cursor-pointer flex flex-col items-center justify-center backdrop-blur-sm ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    : "bg-white shadow-md hover:shadow-2xl border-gray-100"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 30}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                }}
              >
                {/* Colored glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-20 blur-xl transition-opacity duration-300"
                  style={{ backgroundColor: skill.color }}
                />

                {/* Icon - subtle pop out effect */}
                <CardItem translateZ="60" className="relative mb-3">
                  <skill.icon
                    className="text-5xl transition-transform duration-300 group-hover/card:scale-125 group-hover/card:rotate-12"
                    style={{ color: skill.color }}
                  />
                </CardItem>

                {/* Skill name - very subtle elevation */}
                <CardItem
                  translateZ="30"
                  className={`relative text-sm font-medium text-center ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {skill.name}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        {/* Soft Skills - keeping original flat design, no 3D */}
        <div
          className={`p-8 rounded-2xl backdrop-blur-sm border ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white shadow-lg border-gray-100"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-6 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("skills.softSkills")}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {softSkillsKeys.map((key) => (
              <span
                key={key}
                className={`px-5 py-2 rounded-full border-2 font-medium transition-all hover:scale-105 hover:shadow-lg ${
                  isDark
                    ? "border-blue-600 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:shadow-blue-500/50"
                    : "border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-blue-500/20"
                }`}
              >
                {t(`skills.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
