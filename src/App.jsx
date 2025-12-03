// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';
import Watchlist from './pages/Watchlist';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash for 3 seconds on initial load
    const t = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(t);
  }, []);
  if (showSplash) return <Loader full message="Welcome to MovieFinder" />;

  return (
    <BrowserRouter>
      {/* Header is outside Routes so it stays on every page */}
      <Header />
          <main className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-emerald-50 text-gray-900">
            <div className="container mx-auto px-4 py-10 max-w-7xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchResults />} />
           <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
            </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;