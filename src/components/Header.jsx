import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    // Updated to Dark Theme for "AjmalFlix" vibe
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 opacity-95 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* 1. Logo Section - AjmalFlix Branding */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
            🍿
          </span>
          <span className="tracking-wide uppercase">
            <span className="text-red-600">Aj</span>
            <span className="text-white">Flix</span>
          </span>
        </Link>

        {/* 2. Search & Tools Section */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="w-full md:w-80">
            <SearchBar />
          </div>

          {/* Watchlist Link */}
          <Link
            to="/watchlist"
            className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
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