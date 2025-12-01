import { useState, useEffect } from 'react';
import { FaStar, FaCheck, FaTrash, FaEye, FaHome, FaPlus, FaEdit, FaImage } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('comments');
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchAllComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/comments`, {
        headers: {
          'x-admin-secret': adminSecret
        }
      });

      const data = await response.json();

      if (data.success) {
        setComments(data.comments);
        setIsAuthenticated(true);
        setError('');
      } else {
        setError(data.message);
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      const defaultProjects = [
        {
          id: 1,
          title: "Indeed Be Like",
          description: "Clone d'Indeed - Plateforme de recherche d'emploi avec système de candidatures et gestion des offres. Interface moderne et responsive.",
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
          title: "Système de Gestion Hospitalière",
          description: "Projet académique - Application de gestion de données médicales respectant les normes FHIR/HL7 et RGPD.",
          technologies: ["C#", ".NET", "MySQL", "FHIR/HL7"],
          github: null,
          demo: null,
          status: "academic",
          gradient: "from-green-500 to-emerald-500"
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
  };

  const saveProjects = (updatedProjects) => {
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
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

  const handleLogin = (e) => {
    e.preventDefault();
    fetchAllComments();
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${API_URL}/admin/comments/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'x-admin-secret': adminSecret
        }
      });

      const data = await response.json();

      if (data.success) {
        setComments(comments.map(c =>
          c._id === id ? { ...c, isApproved: true } : c
        ));
      } else {
        alert('Erreur lors de l\'approbation');
      }
    } catch (err) {
      console.error('Error approving comment:', err);
      alert('Erreur de connexion');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admin/comments/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-secret': adminSecret
        }
      });

      const data = await response.json();

      if (data.success) {
        setComments(comments.filter(c => c._id !== id));
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Erreur de connexion');
    }
  };

  const pendingComments = comments.filter(c => !c.isApproved);
  const approvedComments = comments.filter(c => c.isApproved);

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
              <label htmlFor="adminSecret" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Clé secrète admin
              </label>
              <input
                type="password"
                id="adminSecret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Entrez la clé secrète"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
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
              Administration
            </h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'comments'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Commentaires
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Projets
          </button>
        </div>

        {activeTab === 'comments' && (
          <div className="grid gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-blue-600">{comments.length}</p>
                  <p className="text-gray-600 dark:text-gray-400">Total</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-600">{pendingComments.length}</p>
                  <p className="text-gray-600 dark:text-gray-400">En attente</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">{approvedComments.length}</p>
                  <p className="text-gray-600 dark:text-gray-400">Approuvés</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
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
        )}

        {activeTab === 'comments' && loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : activeTab === 'comments' ? (
          <>
            {pendingComments.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Commentaires en attente ({pendingComments.length})
                </h2>
                <div className="space-y-4">
                  {pendingComments.map((comment) => (
                    <CommentAdminCard
                      key={comment._id}
                      comment={comment}
                      onApprove={handleApprove}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {approvedComments.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Commentaires approuvés ({approvedComments.length})
                </h2>
                <div className="space-y-4">
                  {approvedComments.map((comment) => (
                    <CommentAdminCard
                      key={comment._id}
                      comment={comment}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                Aucun commentaire
              </div>
            )}
          </>
        ) : activeTab === 'projects' ? (
          <>
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
          </>
        ) : null}
      </div>
    </div>
  );
};

const CommentAdminCard = ({ comment, onApprove, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${!comment.isApproved ? 'border-l-4 border-yellow-500' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
              {comment.name}
            </h4>
            {comment.isApproved ? (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs rounded-full flex items-center gap-1">
                <FaEye /> Visible
              </span>
            ) : (
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 text-xs rounded-full">
                En attente
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {comment.email}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {formatDate(comment.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-lg ${
                  star <= comment.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {comment.comment}
      </p>

      <div className="flex gap-2">
        {!comment.isApproved && onApprove && (
          <button
            onClick={() => onApprove(comment._id)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <FaCheck /> Approuver
          </button>
        )}
        <button
          onClick={() => onDelete(comment._id)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <FaTrash /> Supprimer
        </button>
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
