/* eslint-disable react-hooks/set-state-in-effect */
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/tmdb';
import { useState, useEffect } from 'react';
import { useWatchlist } from '../contexts/WatchlistContext';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? getImageUrl(movie.poster_path)
    : 'https://via.placeholder.com/500x750?text=No+Image'; // Fallback image

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isInWatchlist(movie.id));
  }, [movie.id, isInWatchlist]);

  const toggleFavorite = (e) => {
    // If called from inside a Link, prevent navigation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id);
        setFavorite(false);
      } else {
        addToWatchlist(movie);
        setFavorite(true);
      }
    } catch (err) {
      console.error('toggleFavorite error', err);
      setFavorite((s) => !s);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <div className="relative bg-transparent rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
        {/* Favorite button (top-right) */}
        <button
          onClick={toggleFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 z-20 p-2 rounded-full bg-black/50 hover:bg-black/60 transition text-white"
        >
          {favorite ? (
            <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          ) : (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 8.6c0 4.2-3.4 7.3-8.3 11.4L12 21l-.5-.4C6.6 15.9 3.2 12.8 3.2 8.6 3.2 6 5.2 4 7.8 4c1.5 0 3 .7 4.2 1.9 1.2-1.2 2.7-1.9 4.2-1.9 2.6 0 4.6 2 4.6 4.6z"/></svg>
          )}
        </button>

        <div className="w-full h-72 bg-gray-700">
          <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-3 bg-gradient-to-t from-white/80 to-transparent">
          <h3 className="font-semibold text-md text-gray-900 truncate group-hover:text-indigo-600">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">{movie.release_date?.slice(0,4)}</span>
            <span className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-full bg-yellow-300 text-black">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;