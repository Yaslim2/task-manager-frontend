import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
  isAuthenticated: boolean;
  redirectTo: string;
}

export const ProtectedRoute: React.FC<RequireAuthProps> = ({
  isAuthenticated,
  redirectTo,
}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export const PublicRoute: React.FC<RequireAuthProps> = ({
  isAuthenticated,
  redirectTo,
}) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};
