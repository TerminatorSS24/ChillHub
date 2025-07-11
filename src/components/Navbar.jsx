// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white sticky top-0 z-10">
      <Link to="/home" className="text-2xl font-bold text-red-600">ChillHub</Link>
      <div className="space-x-4">
        {user && (
          <>
            <Link to="/watchlist" className="hover:underline">Watchlist</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
