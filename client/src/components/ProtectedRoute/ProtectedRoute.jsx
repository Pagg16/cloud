import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/autorization" replace />;
};

export default ProtectedRoute;
