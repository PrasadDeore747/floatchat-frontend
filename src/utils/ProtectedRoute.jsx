import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return <div className="text-center text-white mt-20">Checking authentication...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
