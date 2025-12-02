// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      {/* Large 404 Text */}
      <h1 className="text-9xl font-extrabold text-gray-700 tracking-widest">
        404
      </h1>

      {/* Message */}
      <div className="bg-red-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <p className="text-2xl font-semibold md:text-3xl text-white mt-8">
        Cut! We can't find this scene.
      </p>

      <p className="mt-4 text-gray-400 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Button to go Home */}
      <Link
        to="/"
        className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-blue-500/30"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;