import { useState } from "react";
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
import { Code2, BarChart3, Github, Zap, LineChart, Heart } from "lucide-react";
import { useTheme } from "../../context/themecontext";
import { useScrollAnimation } from "../../hooks/UseScrollAnimation";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { SQLPlayground } from "../data/SQLPlayground";
import { GitHubHeatmap } from "../data/GitHubHeatmap";
import { InteractiveChart } from "../data/InteractiveChart";
import { SoftSkillsShowcase } from "../data/SoftSkillsShowcase";

type TabType = "tech" | "sql" | "github" | "analytics" | "softskills";

// Enhanced Skills section with tabs and interactive components
// Showcases Data Analyst & Developer competencies
function SkillsNew() {
  const [ref, isVisible] = useScrollAnimation();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("tech");

  // Tech skills organized by category
  const skillsData = [
    // Data & Analytics (NEW - prioritized for Data Analyst role)
    { name: "Python", icon: FaPython, color: "#3776AB", category: "data" },
    { name: "Pandas", icon: SiPandas, color: "#150458", category: "data" },
    { name: "Power BI", icon: LineChart, color: "#F2C811", category: "data" },
    { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E", category: "data" },
    // Databases
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "database" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1", category: "database" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "database" },
    // Frontend
    { name: "React", icon: FaReact, color: "#61DAFB", category: "frontend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "frontend" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
    { name: "HTML/CSS", icon: FaHtml5, color: "#E34F26", category: "frontend" },
    // Backend
    { name: "PHP", icon: FaPhp, color: "#777BB4", category: "backend" },
    { name: "Symfony", icon: SiSymfony, color: "#000000", category: "backend" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933", category: "backend" },
    // DevOps
    { name: "Docker", icon: FaDocker, color: "#2496ED", category: "devops" },
    { name: "Git", icon: FaGitAlt, color: "#F05032", category: "devops" },
  ];


  // Skills radar chart data
  const radarData = [
    { skill: "Python", level: 85 },
    { skill: "SQL", level: 90 },
    { skill: "Power BI", level: 80 },
    { skill: "React", level: 85 },
    { skill: "Data Analysis", level: 88 },
    { skill: "ETL", level: 82 },
  ];

  // Tabs configuration
  const tabs = [
    { id: "tech" as TabType, label: "Tech Skills", icon: Zap },
    { id: "analytics" as TabType, label: "Analytics", icon: BarChart3 },
    { id: "softskills" as TabType, label: "Soft Skills", icon: Heart },
    { id: "sql" as TabType, label: "SQL Playground", icon: Code2 },
    { id: "github" as TabType, label: "GitHub Activity", icon: Github },
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
      {/* Background decoration */}
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("skills.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4" />
          <p
            className={`text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Data Analysis • Business Intelligence • Full-Stack Development
          </p>
        </div>

        {/* Tabs navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? isDark
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "bg-blue-500 text-white shadow-lg"
                    : isDark
                    ? "bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="min-h-[500px]">
          {/* Tech Skills Tab */}
          {activeTab === "tech" && (
            <div className="space-y-12 animate-fadeIn">
              {/* Skills grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                        transitionDelay: `${index * 30}ms`,
                        opacity: 1,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-20 blur-xl transition-opacity duration-300"
                        style={{ backgroundColor: skill.color }}
                      />
                      <CardItem translateZ="60" className="relative mb-3">
                        <skill.icon
                          className="text-5xl transition-transform duration-300 group-hover/card:scale-125 group-hover/card:rotate-12"
                          style={{ color: skill.color }}
                        />
                      </CardItem>
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
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="animate-fadeIn">
              <div
                className={`p-8 rounded-2xl border ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-8 text-center ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Skills Proficiency Radar
                </h3>
                <div className="max-w-2xl mx-auto">
                  <InteractiveChart
                    type="radar"
                    data={radarData}
                    dataKey="level"
                    xAxisKey="skill"
                    height={400}
                    showLegend={false}
                    showGrid={true}
                  />
                </div>
                <p
                  className={`text-center mt-6 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Self-assessment based on project experience and continuous learning
                </p>
              </div>
            </div>
          )}

          {/* Soft Skills Tab */}
          {activeTab === "softskills" && (
            <div className="animate-fadeIn">
              <SoftSkillsShowcase />
            </div>
          )}

          {/* SQL Playground Tab */}
          {activeTab === "sql" && (
            <div className="animate-fadeIn">
              <div
                className={`p-8 rounded-2xl border ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Interactive SQL Playground
                </h3>
                <p
                  className={`mb-6 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Try out SQL queries on a sample database. SQLite runs entirely in your browser!
                </p>
                <SQLPlayground />
              </div>
            </div>
          )}

          {/* GitHub Activity Tab */}
          {activeTab === "github" && (
            <div className="animate-fadeIn">
              <div
                className={`p-8 rounded-2xl border ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <GitHubHeatmap username="Meta-tomm" year={2025} />
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

export default SkillsNew;
