import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectRoute = ({ children }) => {
  const JwtToken = Cookies.get("authToken");

  // if no token → redirect to login
  if (!JwtToken || JwtToken === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoute;
