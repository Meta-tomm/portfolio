import { useState, useEffect } from 'react';
import { FaStar, FaCheck, FaTrash, FaEye, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
              Gestion des commentaires
            </h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>

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

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
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
        )}
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

export default Admin;
