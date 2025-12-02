
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await searchMovies(query);
        setMovies(response.data.results);
        setError(null);
      } catch (err) {
        console.error(err)
        setError('Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]); // Re-run the effect every time the query changes

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Results for: "{query}"</h1>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found for your search.</p>
      )}
    </div>
  );
};

export default SearchResults;