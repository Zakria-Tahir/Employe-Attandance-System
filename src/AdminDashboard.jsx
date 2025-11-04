import React, { useState } from "react";
import { useSelector } from "react-redux";
import EmployeeList from "./EmployeeList.jsx";
import AddEmployeeModal from "./AddEmployeeModal.jsx";
import EditAttendanceModal from "./EditAttendanceModal.jsx";
import Topbar from "./Topbar.jsx";
import { useNavigate } from "react-router-dom";
import "./Components/Dashboard.css";
import "./Components/admindashing.css";

export default function AdminDashboard() {
  const user = useSelector((s) => s.auth.user);
  const employees = useSelector((s) => s.employees.list || []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const navigate = useNavigate();

  const handleViewAllAttendance = () => {
    navigate("/attendance-records");
  };

  return (
    <div className="admin-dashboard">
      {/* 🔹 Reusable Topbar Component */}
      <Topbar />

      {/* 🔹 Dashboard Content */}
      <div className="main-wrapper">
        <div className="dashboard-wrapper">
          <header className="dashboard-header">
            <div>
              <h2>
                👋 Welcome, 
              </h2>
              <p className="subtitle">
                Manage your employees and track attendance efficiently.
              </p>
            </div>
            <div className="stat-card">
              <h4>Total Employees</h4>
              <p className="total-lenem">{employees.length}</p>
            </div>
          </header>

          <section className="employee-section">
            <div className="section-top">
              <h3>👩‍💼 Employee Management</h3>
              <div className="section-actions">
                <button
                  className="primary-btn"
                  onClick={() => setShowAddModal(true)}
                >
                  ➕ Add Employee
                </button>

                <button
                  className="edit-btn"
                  onClick={() => setShowAttendanceModal(true)}
                >
                  🕒 Edit Attendance
                </button>

                <button className="view-btn" onClick={handleViewAllAttendance}>
                  📅 See All Attendance Record
                </button>
              </div>
            </div>

            <EmployeeList />
          </section>

          {showAddModal && (
            <AddEmployeeModal close={() => setShowAddModal(false)} />
          )}
          {showAttendanceModal && (
            <EditAttendanceModal close={() => setShowAttendanceModal(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
