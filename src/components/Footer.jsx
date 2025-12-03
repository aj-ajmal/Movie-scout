import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-0 border-t bg-white text-gray-700">
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-indigo-100 text-indigo-600">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-500">
                  <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="text-gray-900 text-lg font-semibold">MovieScout</div>
                <div className="text-sm text-gray-600">Discover movies, trailers & cast — fast.</div>
              </div>
            </div>

            <p className="text-sm text-gray-600">Built with the Movie DB API. Browse popular titles, view trailers, and explore cast details with a modern, responsive UI.</p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
                <li><a href="/" className="hover:text-indigo-600">Popular</a></li>
                <li><a href="/" className="hover:text-indigo-600">Top Rated</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="hover:text-indigo-600">TMDB</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Aj Tech — All rights reserved</div>
      </div>
    </footer>
  )
}
