import { FaStar } from 'react-icons/fa';

const CommentCard = ({ comment }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
            {comment.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(comment.createdAt)}
          </p>
        </div>

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

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {comment.comment}
      </p>
    </div>
  );
};

export default CommentCard;
