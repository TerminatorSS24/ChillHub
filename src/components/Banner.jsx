// src/components/Banner.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import requests from '../requests';

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const results = request.data.results;
      setMovie(results[Math.floor(Math.random() * results.length)]);
    }
    fetchData();
  }, []);

  return (
    <header
      className="h-[448px] text-white object-contain bg-cover bg-center"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold">{movie?.title || movie?.name}</h1>
        <p className="w-1/2 text-sm mt-2">{movie?.overview?.substring(0, 150)}...</p>
      </div>
    </header>
  );
}

export default Banner;
