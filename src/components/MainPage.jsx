import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      <div className="text-center space-y-6">
        <h1 className="text-white text-4xl font-bold">Welcome</h1>

        {/* Spaced Button Container */}
        <div className="flex space-x-4 justify-center">
          <button
            className="bg-white text-green-600 px-6 py-2 rounded-lg shadow-md hover:bg-green-100"
            onClick={() => navigate('/login')}
          >
            Log In
          </button>

          <button
            className="bg-white text-green-600 px-6 py-2 rounded-lg shadow-md hover:bg-green-100"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
