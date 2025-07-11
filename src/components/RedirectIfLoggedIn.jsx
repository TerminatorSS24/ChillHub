import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const RedirectIfLoggedIn = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return null;

  if (user) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default RedirectIfLoggedIn;
