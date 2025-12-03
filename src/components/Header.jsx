import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


const Header = () => {
  return (
    // Light, friendly header
    <header className="bg-white text-gray-900 shadow sticky top-0 z-50 border-b">
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* 1. Logo Section - Updated to MovieScout */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
            🎬
          </span>
          <span className="bg-gradient-to-r from-indigo-500 to-sky-400 bg-clip-text text-transparent tracking-wide uppercase">
            MovieScout
          </span>
        </Link>

        {/* 2. Search & Tools Section */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Bar - Keeps your responsive width logic */}
          <div className="w-full md:w-80">
            <SearchBar />
          </div>

          {/* Watchlist Link - visible on mobile and larger screens */}
          <Link
            to="/watchlist"
            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
            title="My Watchlist"
            aria-label="My Watchlist"
          >
            <span className="text-xl md:text-2xl">❤️</span>
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Header;