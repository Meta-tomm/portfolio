import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import CommentForm from '../ui/CommentForm';
import CommentCard from '../ui/CommentCard';
import { useTheme } from '../../context/themecontext';

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const { isDark } = useTheme();

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/comments`);
      const data = await response.json();

      if (data.success) {
        setComments(data.comments);
        setAvgRating(data.avgRating);
      } else {
        setError('Failed to load comments');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();

    // Génération de 200 étoiles avec différentes propriétés
    const newStars = Array.from({ length: 200 }, (_, i) => {
      const sizeType = Math.random();
      let size, opacity, hasGlow, animationSpeed;

      // 70% petites étoiles
      if (sizeType < 0.7) {
        size = Math.random() * 1.5 + 0.5;
        opacity = Math.random() * 0.5 + 0.3;
        hasGlow = false;
        animationSpeed = 'twinkle';
      }
      // 20% étoiles moyennes
      else if (sizeType < 0.9) {
        size = Math.random() * 2 + 1.5;
        opacity = Math.random() * 0.3 + 0.6;
        hasGlow = Math.random() > 0.5;
        animationSpeed = 'twinkle-slow';
      }
      // 10% grandes étoiles brillantes
      else {
        size = Math.random() * 2 + 2.5;
        opacity = Math.random() * 0.2 + 0.8;
        hasGlow = true;
        animationSpeed = 'twinkle-fast';
      }

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        opacity,
        hasGlow,
        animationSpeed,
        delay: Math.random() * 5,
      };
    });
    setStars(newStars);

    // Génération de 5 étoiles filantes
    const newShootingStars = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 50, // Commence dans la première moitié de l'écran
      y: Math.random() * 50,
      delay: Math.random() * 10 + i * 5, // Étalées dans le temps
    }));
    setShootingStars(newShootingStars);
  }, []);

  const handleCommentSubmitted = () => {
    fetchComments();
  };

  return (
    <section
      id="comments"
      className={`relative py-20 overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-b from-gray-900 via-blue-900 to-black"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Étoiles normales avec différentes tailles et brillances */}
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full transition-colors duration-500 ${
              isDark ? "bg-white" : "bg-blue-400"
            } animate-${star.animationSpeed} ${
              star.hasGlow ? 'animate-pulse-glow' : ''
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              boxShadow: star.hasGlow && isDark
                ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8), 0 0 ${star.size * 4}px rgba(147, 197, 253, 0.4)`
                : star.hasGlow
                ? `0 0 ${star.size * 2}px rgba(59, 130, 246, 0.8), 0 0 ${star.size * 4}px rgba(59, 130, 246, 0.4)`
                : 'none',
            }}
          />
        ))}

        {/* Étoiles filantes */}
        {shootingStars.map((star) => (
          <div
            key={`shooting-${star.id}`}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`,
            }}
          >
            <div
              className={`w-1 h-1 rounded-full animate-shooting-star ${
                isDark ? "bg-white" : "bg-blue-300"
              }`}
              style={{
                boxShadow: isDark
                  ? '0 0 2px 1px rgba(255, 255, 255, 0.9), 0 0 10px 2px rgba(147, 197, 253, 0.5)'
                  : '0 0 2px 1px rgba(59, 130, 246, 0.9), 0 0 10px 2px rgba(59, 130, 246, 0.5)',
              }}
            >
              {/* Trainée de l'étoile filante */}
              <div
                className={`absolute w-20 h-0.5 ${
                  isDark ? "bg-gradient-to-r from-white to-transparent" : "bg-gradient-to-r from-blue-300 to-transparent"
                }`}
                style={{
                  top: '50%',
                  left: '-20px',
                  transform: 'translateY(-50%)',
                  opacity: 0.6,
                }}
              />
            </div>
          </div>
        ))}

        {/* Nébuleuses de fond */}
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-float transition-colors duration-700 ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ top: "10%", left: "10%" }}
        />
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-float-delayed transition-colors duration-700 ${
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}
          style={{ bottom: "10%", right: "10%" }}
        />
        <div
          className={`absolute w-72 h-72 rounded-full blur-3xl opacity-10 animate-float transition-colors duration-700 ${
            isDark ? "bg-cyan-500" : "bg-cyan-300"
          }`}
          style={{ top: "50%", right: "20%", animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Commentaires & Avis
          </h2>

          {comments.length > 0 && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-2xl ${
                      star <= avgRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {avgRating} / 5
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                ({comments.length} {comments.length === 1 ? 'avis' : 'avis'})
              </span>
            </div>
          )}
        </div>

        <div className="mb-12">
          <CommentForm
            onCommentSubmitted={handleCommentSubmitted}
            apiUrl={API_URL}
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Tous les avis
          </h3>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Chargement...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              {error}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              Aucun commentaire pour le moment. Soyez le premier à laisser un avis!
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
