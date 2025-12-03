
import { useState, useEffect } from 'react';
import { getMovies, getGenres } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getGenres();
        setGenres(res.data.genres);
      } catch (err) {
        console.error("Failed to fetch genres" , err);
      }
    };
    fetchGenres();
  }, []);

  // 2. Fetch Movies (Reset list if genre changes, Append if page changes)
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await getMovies(page, selectedGenre);
        if (page === 1) {
          setMovies(res.data.results); // Overwrite if it's page 1
        } else {
          setMovies((prev) => [...prev, ...res.data.results]); // Append if loading more
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, selectedGenre]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1); // Reset to page 1
    setMovies([]); // Clear current list
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="pb-10">
      {/* Genre Filter Bar */}
      <div className="overflow-x-auto md:overflow-visible py-4 mb-6 -mx-2 px-2 scrollbar-hide">
        <div className="flex gap-3 items-center snap-x md:flex-wrap md:gap-4">
          <button
            onClick={() => handleGenreClick(null)}
            className={`genre-pill shrink-0 md:shrink snap-start px-4 py-2 rounded-full whitespace-nowrap shadow-sm transform transition hover:scale-105 ${
              selectedGenre === null ? 'bg-indigo-500 text-white' : 'bg-white/90 text-gray-700 border border-gray-200'
            }`}
          >
            All
          </button>

          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => handleGenreClick(g.id)}
              className={`genre-pill shrink-0 md:shrink snap-start px-4 py-2 rounded-full whitespace-nowrap shadow-sm transform transition hover:scale-105 ${
                selectedGenre === g.id ? 'bg-indigo-500 text-white' : 'bg-white/90 text-gray-700 border border-gray-200'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;