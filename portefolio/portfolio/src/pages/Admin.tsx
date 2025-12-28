import { useState, useEffect, useCallback } from 'react';
import { FaHome, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Admin password - can be changed via environment variable
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'hello?123';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const loadProjects = useCallback(async () => {
    if (!adminSecret) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/projects`, {
        headers: {
          'x-admin-secret': adminSecret
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setProjects(data.data);
        }
      } else if (response.status === 401 || response.status === 403) {
        setError('Session expirée. Veuillez vous reconnecter.');
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_secret');
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
      setError('Erreur de chargement des projets');
    } finally {
      setLoading(false);
    }
  }, [adminSecret, API_URL]);

  useEffect(() => {
    // Check if user is already authenticated
    const savedSecret = sessionStorage.getItem('admin_secret');
    if (savedSecret) {
      setAdminSecret(savedSecret);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && adminSecret) {
      loadProjects();
    }
  }, [isAuthenticated, adminSecret, loadProjects]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      // For backend API, we need the admin secret
      const secret = prompt('Entrez le secret admin (x-admin-secret):');
      if (secret) {
        setAdminSecret(secret);
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_secret', secret);
      } else {
        setError('Secret admin requis');
      }
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_secret');
    setAdminSecret('');
    setPassword('');
    setProjects([]);
  };

  const handleAddProject = async (projectData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': adminSecret
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await loadProjects();
          setShowProjectForm(false);
          // Trigger event for frontend update
          window.dispatchEvent(new Event('projectsUpdated'));
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Erreur lors de l\'ajout du projet');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      setError('Erreur lors de l\'ajout du projet');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async (projectData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/projects/${editingProject._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': adminSecret
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await loadProjects();
          setEditingProject(null);
          setShowProjectForm(false);
          // Trigger event for frontend update
          window.dispatchEvent(new Event('projectsUpdated'));
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Erreur lors de la mise à jour du projet');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      setError('Erreur lors de la mise à jour du projet');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-secret': adminSecret
        }
      });

      if (response.ok) {
        await loadProjects();
        // Trigger event for frontend update
        window.dispatchEvent(new Event('projectsUpdated'));
      } else {
        const data = await response.json();
        setError(data.message || 'Erreur lors de la suppression du projet');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Erreur lors de la suppression du projet');
    } finally {
      setLoading(false);
    }
  };

  // Login screen
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

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {error}
            <button onClick={() => setError('')} className="float-right text-red-900 dark:text-red-100">×</button>
          </div>
        )}

        <div className="mb-8">
          <button
            onClick={() => {
              setEditingProject(null);
              setShowProjectForm(true);
            }}
            disabled={loading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
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
            loading={loading}
          />
        ) : (
          <>
            {loading && (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
              </div>
            )}

            {!loading && (
              <div className="grid gap-4">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
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
                    Aucun projet. Ajoutez-en un pour commencer.
                  </div>
                )}
              </div>
            )}
          </>
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
          {project.subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.subtitle}</p>
          )}
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            project.status === 'in-progress'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : project.status === 'completed'
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}>
            {project.status}
          </span>
          {!project.isVisible && (
            <span className="ml-2 text-xs px-3 py-1 rounded-full font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200">
              Masqué
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(project)}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <FaEdit /> Modifier
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <FaTrash /> Supprimer
          </button>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags?.map((tech, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
        {project.github && <span>GitHub: {project.github}</span>}
        {project.demo && <span>Demo: {project.demo}</span>}
      </div>
    </div>
  );
};

const ProjectForm = ({ project, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState(project || {
    title: '',
    subtitle: '',
    description: '',
    tags: [],
    github: '',
    demo: '',
    status: 'in-progress',
    gradient: 'from-blue-500 to-cyan-500',
    isVisible: true,
    order: 0
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
        tags: [...(formData.tags || []), techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
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
            Titre *
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
            Sous-titre
          </label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Description *
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
            {formData.tags?.map((tech, index) => (
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="in-progress">En cours</option>
              <option value="completed">Terminé</option>
              <option value="academic">Académique</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Ordre d'affichage
            </label>
            <input
              type="number"
              value={formData.order || 0}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
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
            <option value="from-indigo-500 to-blue-500">Indigo → Bleu</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isVisible"
            checked={formData.isVisible !== false}
            onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="isVisible" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Visible sur le site
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : (project ? 'Mettre à jour' : 'Ajouter')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
