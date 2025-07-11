// src/pages/Watchlist.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Navbar from "../components/Navbar";

function Watchlist() {
  const [user] = useAuthState(auth);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      collection(db, "users", user.email, "watchlist"),
      (snapshot) => {
        setSavedMovies(snapshot.docs.map((doc) => doc.data()));
      }
    );
    return () => unsubscribe();
  }, [user]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="p-8 text-white">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {savedMovies.map((movie) => (
          <img
            key={movie.id}
            className="rounded-md"
            src={`${base_url}${movie.poster}`}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
