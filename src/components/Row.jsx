// src/components/Row.jsx
import React, { useEffect, useState } from "react";
import axios from "../axios";
import MovieCard from "./MovieCard";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="text-white px-4 md:px-8">
      <h2 className="text-xl sm:text-2xl font-bold my-4">{title}</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Row;
