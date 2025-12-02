import { useWatchlist } from '../contexts/WatchlistContext';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold text-gray-700">Your Watchlist is Empty</h1>
        <p className="text-gray-500 mt-4">Start adding movies by clicking the heart icon!</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;