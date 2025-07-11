import React, { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import movieTrailer from "movie-trailer";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function MovieCard({ movie }) {
  const [user] = useAuthState(auth);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.email, "watchlist", movie.id.toString());
        const docSnap = await getDoc(docRef);
        setIsInWatchlist(docSnap.exists());
      } catch (error) {
        console.error("Watchlist check error:", error.message);
      }
    };

    checkWatchlist();
  }, [user, movie.id]);

  const toggleWatchlist = async () => {
    if (!user) return toast.error("Login to save movies");

    const docRef = doc(db, "users", user.email, "watchlist", movie.id.toString());

    try {
      if (isInWatchlist) {
        await deleteDoc(docRef);
        setIsInWatchlist(false);
        toast("❌ Removed from Watchlist");
      } else {
        await setDoc(docRef, {
          id: movie.id,
          title: movie.title || movie.name,
          poster: movie.poster_path,
        });
        setIsInWatchlist(true);
        toast.success("✅ Saved to Watchlist");
      }
    } catch (error) {
      console.error("Toggle failed:", error.message);
      toast.error("Failed to update watchlist");
    }
  };

  const openTrailerInNewTab = () => {
    movieTrailer(movie?.title || movie?.name || "")
      .then((url) => {
        if (url) window.open(url, "_blank");
        else toast.error("Trailer not found");
      })
      .catch(() => toast.error("Unable to load trailer"));
  };

  return (
    <div className="relative group flex-shrink-0">
      <img
        className="w-28 sm:w-36 md:w-40 lg:w-48 rounded-md cursor-pointer transition-transform hover:scale-105 object-cover aspect-[2/3]"
        src={`${base_url}${movie.poster_path}`}
        alt={movie.title}
        onClick={openTrailerInNewTab}
      />

      <motion.button
        onClick={toggleWatchlist}
        key={isInWatchlist ? "liked" : "unliked"}
        whileTap={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`absolute top-2 right-2 text-2xl ${
          isInWatchlist ? "text-red-500" : "text-white"
        }`}
      >
        {isInWatchlist ? "❤️" : "🤍"}
      </motion.button>
    </div>
  );
}

export default MovieCard;
