import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    // Updated to Dark Theme (bg-gray-900) to match Header
    <footer className="mt-0 border-t border-gray-800 bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* 1. Branding Section */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              {/* Popcorn Icon */}
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                🍿
              </div>
              {/* AjmalFlix Logo Text */}
              <div className="text-2xl font-bold tracking-wide uppercase">
                <span className="text-red-600">Aj</span>
                <span className="text-white">Flix</span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 mt-2">
              Discover movies, trailers & cast — fast.
              Built with the TMDB API using React & Tailwind CSS.
            </p>
          </div>

          {/* 2. Navigation Links */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/watchlist" className="hover:text-red-500 transition-colors">My Watchlist</Link>
                </li>
                {/* <li>
                  <Link to="/search?q=action" className="hover:text-red-500 transition-colors">Popular Movies</Link>
                </li> */}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="https://github.com/aj-ajmal" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">GitHub</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/syedajmal1703/" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">LinkedIn</a>
                </li>
              </ul>
            </div>

             {/* <div>
              <h4 className="text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider">Powered By</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">
                    The Movie Database
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* 3. Copyright Section */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Aj Flix — Designed by Aj Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}