import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="relative h-screen w-full text-white overflow-hidden">
      {/* Background Image or Video */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1470&q=80"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">ChillHub</h1>
        
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Welcome to <span className="text-red-600">ChillHub</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-300">
          Your personal streaming space. Browse and save your favorite movies.
        </p>
        <Link
          to="/signup"
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md font-semibold text-lg transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Landing;
