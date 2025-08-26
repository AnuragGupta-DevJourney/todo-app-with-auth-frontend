import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectRoutes({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // will be true if token exists, false otherwise
  }, []);

  // While checking, don't render anything yet
  if (isLoggedIn === null) {
    return <div>Loading...</div>; // or a spinner
  }

  // Once we know the result
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectRoutes;
