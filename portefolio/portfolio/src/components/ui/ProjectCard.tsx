import { Link } from "react-router-dom";
import { Github, ExternalLink, Eye } from "lucide-react";
import { useTheme } from "../../context/themecontext";
import { CardBody, CardContainer, CardItem } from "./3d-card";

interface ProjectCardProps {
  id?: string; // If provided, enables "View Details" link
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  gradient: string;
  status: string;
  index: number;
  isVisible: boolean;
}

// Project card component with optional detail page link
// Used in Projects section for both data and non-data projects
export function ProjectCard({
  id,
  title,
  description,
  technologies,
  github,
  demo,
  gradient,
  status,
  index,
  isVisible,
}: ProjectCardProps) {
  const { isDark } = useTheme();

  const statusLabels: Record<string, { label: string; color: string }> = {
    completed: { label: "Completed", color: "bg-green-500" },
    inProgress: { label: "In Progress", color: "bg-yellow-500" },
    "in-progress": { label: "In Progress", color: "bg-yellow-500" },
    academic: { label: "Academic", color: "bg-blue-500" },
  };

  const statusInfo = statusLabels[status] || {
    label: "Unknown",
    color: "bg-gray-500",
  };

  return (
    <CardContainer className="inter-var" containerClassName="w-full">
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
        {/* Gradient bar */}
        <CardItem translateZ="50" className="w-full">
          <div className={`h-2 rounded-t-xl bg-gradient-to-r ${gradient}`} />
        </CardItem>

        {/* Header with title and status */}
        <div className="flex justify-between items-start mt-4 mb-4 gap-3">
          <CardItem translateZ="50" className="flex-1">
            <h3
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
          </CardItem>

          <CardItem translateZ="50" className="flex-shrink-0">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusInfo.color}`}
            >
              {statusInfo.label}
            </span>
          </CardItem>
        </div>

        {/* Description */}
        <CardItem translateZ="60" className="mb-4 flex-1">
          <p
            className={`text-sm leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </CardItem>

        {/* Technologies */}
        <CardItem translateZ="50" className="mb-6">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 rounded text-xs font-medium ${
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

        {/* Actions */}
        <CardItem translateZ="50" className="flex gap-3">
          {/* View Details button (if project has detail page) */}
          {id && (
            <Link
              to={`/projects/${id}`}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <Eye className="w-4 h-4" />
              View Details
            </Link>
          )}

          {/* GitHub link */}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                id ? "" : "flex-1"
              } flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
              title="View source code"
            >
              <Github className="w-4 h-4" />
              {!id && "Code"}
            </a>
          )}

          {/* Demo link */}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                id ? "" : "flex-1"
              } flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              title="View live demo"
            >
              <ExternalLink className="w-4 h-4" />
              {!id && "Demo"}
            </a>
          )}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
