import { useState, useEffect, useCallback } from 'react';
import { FaHome, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Mot de passe admin - vous pouvez le changer ici ou utiliser une variable d'environnement
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'hello?123';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loadProjects = useCallback(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      let projects = JSON.parse(savedProjects);

      // Vérifier si BankSecure existe, sinon l'ajouter
      const bankSecureExists = projects.some(p =>
        p.github === "https://github.com/Meta-tomm/BANKSECURE-JAVA-SPRING-TSX.git" ||
        p.title?.includes("BankSecure") ||
        p.title?.includes("BankFlow")
      );

      if (!bankSecureExists) {
        const bankSecureProject = {
          id: 5,
          title: "BankSecure - Système Bancaire",
          description: "API REST sécurisée pour gestion de transactions bancaires avec authentification JWT et système de micro-services. Gestion des comptes, virements, historique des transactions avec traçabilité complète et respect des normes de sécurité bancaire.",
          technologies: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
          github: "https://github.com/Meta-tomm/BANKSECURE-JAVA-SPRING-TSX.git",
          demo: null,
          status: "academic",
          gradient: "from-indigo-500 to-blue-500"
        };
        projects.push(bankSecureProject);
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
      }

      setProjects(projects);
    } else {
      const defaultProjects = [
        {
          id: 1,
          title: "Recrute AI",
          description: "Recrut AI - Plateforme de recherche d'emploi avec système de candidatures et gestion des offres. Interface moderne et responsive.",
          technologies: ["React", "Node.js", "JavaScript", "Tailwind"],
          github: "https://github.com/Meta-tomm/Site.git",
          demo: null,
          status: "inProgress",
          gradient: "from-blue-500 to-cyan-500",
          hasGallery: true,
          screenshots: [
            { url: "/projects/indeed-screenshots/home.png", alt: "Dashboard Client Indeed Be Like", caption: "Dashboard client - Gestion des candidatures et profil" },
            { url: "/projects/indeed-screenshots/search.png", alt: "Interface de Swipe", caption: "Système de swipe pour parcourir les offres d'emploi" },
            { url: "/projects/indeed-screenshots/job-detail.png", alt: "Dashboard Entreprise", caption: "Dashboard entreprise - Gestion des offres et candidatures" },
            { url: "/projects/indeed-screenshots/application.png", alt: "Système de messagerie", caption: "Interface de messagerie entre candidats et entreprises" }
          ]
        },
        {
          id: 2,
          title: "Portfolio Professionnel",
          description: "Portfolio personnel moderne avec animations fluides, construit avec React et Tailwind CSS. Design minimaliste et performant.",
          technologies: ["React", "Tailwind CSS", "Framer Motion"],
          github: "https://github.com/Meta-tomm/portfolio",
          demo: null,
          status: "inProgress",
          gradient: "from-purple-500 to-pink-500"
        },
        {
          id: 3,
          title: "MediTrack .NET - Système de Gestion Hospitalier",
          description: "Développement d'une API de gestion des dossiers patients avec implémentation stricte de la confidentialité des données via Identity. Optimisation des requêtes SQL avec Entity Framework pour traiter de gros volumes de données.",
          technologies: ["C#", "ASP.NET Core 8", "Entity Framework", "SQL Server"],
          github: "https://github.com/Meta-tomm/MEDITRACK.git",
          demo: null,
          status: "academic",
          gradient: "from-green-500 to-emerald-500"
        },
        {
          id: 4,
          title: "DataFin Predictor - Analyse de Données",
          description: "Script d'automatisation pour l'analyse de flux de trésorerie. Utilisation de techniques de machine learning pour prédire les tendances financières et optimiser la gestion budgétaire.",
          technologies: ["Python", "Pandas", "Scikit-learn"],
          github: null,
          demo: null,
          status: "academic",
          gradient: "from-orange-500 to-red-500"
        },
        {
          id: 5,
          title: "BankSecure - Système Bancaire",
          description: "API REST sécurisée pour gestion de transactions bancaires avec authentification JWT et système de micro-services. Gestion des comptes, virements, historique des transactions avec traçabilité complète et respect des normes de sécurité bancaire.",
          technologies: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
          github: "https://github.com/Meta-tomm/BANKSECURE-JAVA-SPRING-TSX.git",
          demo: null,
          status: "academic",
          gradient: "from-indigo-500 to-blue-500"
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    const authSession = localStorage.getItem('admin_auth_session');
    if (authSession === 'authenticated') {
      setIsAuthenticated(true);
      loadProjects();
    }
  }, [loadProjects]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth_session', 'authenticated');
      loadProjects();
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth_session');
    setPassword('');
  };

  const saveProjects = (updatedProjects) => {
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    // Déclencher un événement pour mettre à jour Project.jsx
    window.dispatchEvent(new Event('projectsUpdated'));
  };

  const handleAddProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now()
    };
    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    setShowProjectForm(false);
  };

  const handleUpdateProject = (projectData) => {
    const updatedProjects = projects.map(p =>
      p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p
    );
    saveProjects(updatedProjects);
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const handleDeleteProject = (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }
    const updatedProjects = projects.filter(p => p.id !== id);
    saveProjects(updatedProjects);
  };


  // Écran de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Administration
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Entrez le mot de passe"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <FaHome /> Retour
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Administration - Projets
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>

        <div className="mb-8">
          <button
            onClick={() => {
              setEditingProject(null);
              setShowProjectForm(true);
            }}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <FaPlus /> Ajouter un projet
          </button>
        </div>

        {showProjectForm ? (
          <ProjectForm
            project={editingProject}
            onSave={editingProject ? handleUpdateProject : handleAddProject}
            onCancel={() => {
              setShowProjectForm(false);
              setEditingProject(null);
            }}
          />
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={(project) => {
                  setEditingProject(project);
                  setShowProjectForm(true);
                }}
                onDelete={handleDeleteProject}
              />
            ))}
            {projects.length === 0 && (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                Aucun projet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            project.status === 'inProgress'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : project.status === 'completed'
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}>
            {project.status}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(project)}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <FaEdit /> Modifier
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <FaTrash /> Supprimer
          </button>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies?.map((tech, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
        {project.github && <span>GitHub: {project.github}</span>}
        {project.demo && <span>Demo: {project.demo}</span>}
      </div>
    </div>
  );
};

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState(project || {
    title: '',
    description: '',
    technologies: [],
    github: '',
    demo: '',
    status: 'inProgress',
    gradient: 'from-blue-500 to-cyan-500',
    hasGallery: false,
    screenshots: []
  });

  const [techInput, setTechInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {project ? 'Modifier le projet' : 'Ajouter un projet'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Titre
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Technologies
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Ajouter une technologie"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies?.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Lien GitHub
          </label>
          <input
            type="url"
            value={formData.github || ''}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Lien Demo
          </label>
          <input
            type="url"
            value={formData.demo || ''}
            onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Statut
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="inProgress">En cours</option>
            <option value="completed">Terminé</option>
            <option value="academic">Académique</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Gradient
          </label>
          <select
            value={formData.gradient}
            onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="from-blue-500 to-cyan-500">Bleu → Cyan</option>
            <option value="from-purple-500 to-pink-500">Violet → Rose</option>
            <option value="from-green-500 to-emerald-500">Vert → Émeraude</option>
            <option value="from-orange-500 to-red-500">Orange → Rouge</option>
            <option value="from-yellow-500 to-orange-500">Jaune → Orange</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            {project ? 'Mettre à jour' : 'Ajouter'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
