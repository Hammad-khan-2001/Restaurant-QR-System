import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoutes = ({ children }) => {
  const token =
    useSelector((state) => state.auth.token) ||
    JSON.parse(localStorage.getItem("token"));

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OpenRoutes;



