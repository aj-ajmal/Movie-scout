import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Helper function to get the full image URL
export const getImageUrl = (path, width = 500) => {
  return `https://image.tmdb.org/t/p/w${width}${path}`;
};

// --- Define Your API Functions ---

// load more
export const getPopularMovies = (page = 1) => {
  return tmdbApi.get('/movie/popular', {
    params: { page } // Send page number to API
  });
};

// Search for movies
export const searchMovies = (query) => {
  return tmdbApi.get('/search/movie', {
    params: { query },
  });
};



// Get details for a single movie
export const getMovieDetails = (movieId) => {
  return tmdbApi.get(`/movie/${movieId}`);
};

// Get credits (cast) for a single movie
export const getMovieCredits = (movieId) => {
  return tmdbApi.get(`/movie/${movieId}/credits`);
};

// Get trailers for a movie
export const getMovieVideos = (movieId) => {
  return tmdbApi.get(`/movie/${movieId}/videos`);
};

// Get list of genres
export const getGenres = () => {
  return tmdbApi.get('/genre/movie/list');
};

// General movie list fetcher (supports optional genre filter)
export const getMovies = (page = 1, genre = null) => {
  const params = { page };
  if (genre) params.with_genres = genre;
  return tmdbApi.get('/discover/movie', { params });
};

// Get similar movies for a given movie
export const getSimilarMovies = (movieId, page = 1) => {
  return tmdbApi.get(`/movie/${movieId}/similar`, { params: { page } });
};