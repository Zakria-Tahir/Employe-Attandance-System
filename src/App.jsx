// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import EmployeeDashboard from "./EmployeeDashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AttendanceRecord from "./AttendanceRecord.jsx";


export default function App() {
  return (
    <Routes>
      {/* Set login as the default route */}
      <Route path="/" element={<LoginForm />} />

      {/* Protected routes for any authenticated user */}
      <Route element={<ProtectedRoute />}>
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Route>

      {/* Admin-only route */}
      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route path="/admin" element={<AdminDashboard />} />
       
      </Route>

      <Route element={<ProtectedRoute />}>
       <Route path="/attendance-records" element={<AttendanceRecord />} />
       
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
