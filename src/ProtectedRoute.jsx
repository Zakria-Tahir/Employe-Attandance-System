// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/*
  Usage:
  <Route element={<ProtectedRoute/>}>
    <Route path="/admin" element={<AdminDashboard/>} />
  </Route>
*/

export default function ProtectedRoute({ redirectTo = "/", adminOnly = false }) {
  const user = useSelector((state) => state.auth.user);
  // If not authenticated, redirect to login (root `/`)
  if (!user) return <Navigate to={redirectTo} replace />;
  // If this route requires admin and the user is not admin, redirect to login/root
  if (adminOnly && !user.isAdmin) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}
