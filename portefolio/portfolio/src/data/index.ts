// Export all data modules
export { projectsData } from "./projects-data";
export type { ProjectData } from "./projects-data";

// Import for use in helper function
import { projectsData } from "./projects-data";

// Helper to get all projects (data projects + localStorage projects)
export function getAllProjects() {
  const dataProjects = projectsData.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    technologies: p.tags,
    github: p.github,
    demo: p.demo,
    status: p.status,
    gradient: p.gradient,
    hasDetailPage: true, // Flag to show "View Details" button
  }));

  // Get projects from localStorage (legacy system for non-data projects)
  const savedProjects = localStorage.getItem("portfolio_projects");
  const legacyProjects = savedProjects ? JSON.parse(savedProjects) : [];

  // Return data projects first, then legacy projects
  return [...dataProjects, ...legacyProjects.filter((p: any) => {
    // Exclude data projects that are also in localStorage
    return !dataProjects.some(dp => dp.title === p.title);
  })];
}
