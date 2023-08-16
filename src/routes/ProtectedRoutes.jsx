import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import React from "react";
const ProtectedRoute = ({ email, redirectPath = "/welcome" }) => {  
  if (!email) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
