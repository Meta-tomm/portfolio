import { useParams, Link, Navigate } from "react-router-dom";
import { useTheme } from "../../context/themecontext";
import { ArrowLeft, Github, ExternalLink, Code2 } from "lucide-react";
import { projectsData, ProjectData } from "../../data/projects-data";
import { KPICard } from "../../components/data/KPICard";
import { InteractiveChart } from "../../components/data/InteractiveChart";
import { PowerBIDashboard } from "../../components/data/PowerBIDashboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import ProjectLayout from "../../components/layout/ProjectLayout";
import {
  Database,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

// Map icon names to components for KPIs
const iconMap: Record<string, any> = {
  Database,
  TrendingUp,
  Users,
  Zap,
};

// Detailed project page with data visualizations
// Showcases Data Analyst competencies in action
export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const { isDark } = useTheme();

  // Find project data
  const project = projectsData.find((p) => p.id === projectId);

  // Redirect to home if project not found
  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <ProjectLayout>
      <div className="pt-24 pb-16">
        {/* Back button */}
        <div className="container mx-auto px-4 mb-8">
          <Link
            to="/#projects"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDark
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        {/* Hero Banner */}
        <section className="container mx-auto px-4 mb-16">
          <div
            className={`relative rounded-2xl overflow-hidden p-12 ${
              isDark ? "bg-gray-800/50" : "bg-white"
            } border ${isDark ? "border-gray-700" : "border-gray-200"}`}
          >
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`}
            />

            <div className="relative z-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1
                className={`text-4xl md:text-5xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {project.title}
              </h1>

              {/* Subtitle */}
              <p
                className={`text-xl mb-6 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {project.subtitle}
              </p>

              {/* Description */}
              <p
                className={`text-lg max-w-4xl mb-8 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {project.description}
              </p>

              {/* Links */}
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                      isDark
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* KPIs Section */}
        {project.kpis && project.kpis.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <h2
              className={`text-3xl font-bold mb-8 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Key Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.kpis.map((kpi, index) => {
                // Use appropriate icon or default
                const IconComponent = iconMap[kpi.label.split(" ")[0]] || Database;
                return (
                  <KPICard
                    key={index}
                    title={kpi.label}
                    value={kpi.value}
                    unit={kpi.unit}
                    icon={IconComponent}
                    trend={kpi.trend}
                    color={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"][index % 4]}
                    animationDelay={index * 100}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Power BI Dashboard */}
        {project.powerBI && (
          <section className="container mx-auto px-4 mb-16">
            <PowerBIDashboard
              embedUrl={project.powerBI.embedUrl}
              reportId={project.powerBI.reportId}
              fallbackImage={project.powerBI.fallbackImage}
              title={`${project.title} Dashboard`}
              description="Interactive Power BI dashboard with live data analysis"
            />
          </section>
        )}

        {/* Charts Section */}
        {project.charts && project.charts.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <h2
              className={`text-3xl font-bold mb-8 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Data Visualizations
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {project.charts.map((chart, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <InteractiveChart
                    type={chart.type}
                    data={chart.data}
                    dataKey={chart.dataKey}
                    xAxisKey={chart.xAxisKey}
                    title={chart.title}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Architecture */}
        {project.architecture && (
          <section className="container mx-auto px-4 mb-16">
            <h2
              className={`text-3xl font-bold mb-8 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Architecture
            </h2>
            <div
              className={`p-8 rounded-xl border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {project.architecture.description}
              </p>
              {/* TODO: Add architecture diagram (Excalidraw embed or SVG) */}
            </div>
          </section>
        )}

        {/* Code Snippets */}
        {project.codeSnippets && project.codeSnippets.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <h2
              className={`text-3xl font-bold mb-8 flex items-center gap-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <Code2 className="w-8 h-8" />
              Code Highlights
            </h2>
            <div className="space-y-8">
              {project.codeSnippets.map((snippet, index) => (
                <div key={index} className="space-y-3">
                  <h3
                    className={`text-xl font-semibold ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {snippet.description}
                  </h3>
                  <div className="rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-300'}">
                    <SyntaxHighlighter
                      language={snippet.language}
                      style={isDark ? vscDarkPlus : vs}
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        fontSize: "0.9rem",
                      }}
                      showLineNumbers
                    >
                      {snippet.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Learnings */}
        <section className="container mx-auto px-4">
          <h2
            className={`text-3xl font-bold mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Key Learnings & Insights
          </h2>
          <div
            className={`p-8 rounded-xl border ${
              isDark
                ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-700/50"
                : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200"
            }`}
          >
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-xl">✓</span>
                <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Designed and implemented complete ETL pipeline for automated data collection
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-xl">✓</span>
                <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Optimized SQL queries for performance, achieving 90%+ efficiency gains
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-xl">✓</span>
                <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Created interactive dashboards enabling data-driven decision making
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-xl">✓</span>
                <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Mastered data visualization best practices for business intelligence
                </p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
}
