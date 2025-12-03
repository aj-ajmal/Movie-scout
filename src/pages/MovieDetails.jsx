import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieVideos, getSimilarMovies, getImageUrl } from '../api/tmdb';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard'; // <--- Added this import

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [video, setVideo] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]); // <--- Added state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        // Fetch details, credits, videos, AND similar movies in parallel
        const [detailsRes, creditsRes, videosRes, similarRes] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
          getSimilarMovies(id) // <--- Added API call here
        ]);

        setMovie(detailsRes.data);
        setCredits(creditsRes.data);
        setSimilarMovies(similarRes.data.results); // <--- Set data here

        // Find the official YouTube trailer
        const officialTrailer = videosRes.data.results.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer'
        );
        setVideo(officialTrailer);
        setError(null);

      } catch (err) {
        console.error(err);
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    // Scroll to top when ID changes (important for clicking similar movies)
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-400 text-center">{error}</p>;
  if (!movie) return null;

  const posterUrl = getImageUrl(movie.poster_path);
  const backdropUrl = getImageUrl(movie.backdrop_path, 1280);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Backdrop Image */}
      <div className="relative rounded-lg overflow-hidden shadow-xl z-0">
        <div
          className="w-full h-56 sm:h-72 md:h-96 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${backdropUrl})` }}
          role="img"
          aria-label={`${movie.title} backdrop`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/75 via-violet-800/40 to-transparent z-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 -mt-20 items-start">
        {/* Poster */}
        <div className="md:col-span-3 lg:col-span-3 flex justify-center md:justify-start z-30">
          <div className="w-48 md:w-full max-w-xs md:max-w-none md:sticky md:top-28">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-auto rounded-xl shadow-2xl border-4 border-indigo-900/50 z-40"
            />
          </div>
        </div>

        {/* Details Column */}
        <div className="md:col-span-9 lg:col-span-9 text-gray-900 relative z-20">
          <div className="bg-white/90 backdrop-blur-sm p-5 mb-5 rounded-lg mt-0 shadow">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-2">{movie.title}</h1>
            {movie.tagline && <p className="text-lg italic text-gray-600 mb-4">{movie.tagline}</p>}

            <div className="prose max-w-none text-gray-700 mb-6">
              <p>{movie.overview}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
              <div>
                <div className="text-xs text-gray-500">Rating</div>
                <div className="font-semibold text-lg">{(movie.vote_average ?? 0).toFixed(1)} / 10</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Release Date</div>
                <div className="font-semibold">{movie.release_date ?? 'N/A'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Genres</div>
                <div className="font-semibold">{(movie.genres || []).map(g => g.name).join(', ') || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500 text-white text-sm">
              {movie.runtime ? `${movie.runtime} min` : 'Runtime N/A'}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-600 text-white text-sm">
              {movie.status ?? 'Status N/A'}
            </span>
          </div>

          {/* Cast */}
          <section className="mb-10 mt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Top Billed Cast</h2>
            {credits?.cast?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {credits.cast.slice(0, 10).map((actor) => (
                  <div key={actor.cast_id ?? actor.id} className="bg-white rounded-lg p-3 text-center border">
                    <img
                      src={actor.profile_path ? getImageUrl(actor.profile_path, 200) : 'https://via.placeholder.com/200x300?text=No+Photo'}
                      alt={actor.name}
                      className="w-full h-44 object-cover rounded-md mb-2"
                    />
                    <p className="font-semibold text-sm text-gray-900">{actor.name}</p>
                    <p className="text-xs text-gray-600">{actor.character}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No cast information available.</p>
            )}
          </section>

          {/* Trailer */}
          {video && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Official Trailer</h2>
              <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </section>
          )}

          {/* Similar Movies Section (NEW) */}
          {similarMovies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">You might also like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarMovies.slice(0, 4).map((m) => (
                   <MovieCard key={m.id} movie={m} />
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;