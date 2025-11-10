import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmployeeList from "./EmployeeList.jsx";
import AddEmployeeModal from "./AddEmployeeModal.jsx";
import EditAttendanceModal from "./EditAttendanceModal.jsx";
import Topbar from "./Topbar.jsx";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { ref, onChildAdded, update } from "firebase/database"; // ✅ we’ll mark review as notified
import "./Components/Dashboard.css";
import "./Components/admindashing.css";

export default function AdminDashboard() {
  const user = useSelector((s) => s.auth.user);
  const employees = useSelector((s) => s.employees.list || []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  // ✅ Desktop Notification helper
  const showDesktopNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  // ✅ Ask permission once
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // ✅ Real-time Firebase listener for *new unnotified* reviews
  useEffect(() => {
    const reviewRef = ref(db, "reviews");

    const unsubscribe = onChildAdded(reviewRef, (snapshot) => {
      const review = snapshot.val();
      const reviewKey = snapshot.key;

      // ⚡ Only notify if not yet marked as notified
      if (review?.notified) return;

      // ✅ Show popup and desktop notification
      const message = `🆕 New review from ${review.name}`;
      setNotifications((prev) => [review, ...prev]);
      setPopup(message);

      showDesktopNotification("New Review Received", `${review.name}: ${review.text}`);

      // ✅ Mark this review as notified in Firebase
      update(ref(db, `reviews/${reviewKey}`), { notified: true });

      // Auto hide popup
      setTimeout(() => setPopup(null), 6000);
    });

    return () => unsubscribe();
  }, []);

  const handleViewAllAttendance = () => {
    navigate("/attendance-records");
  };

  return (
    <div className="admin-dashboard">
      <Topbar />

      {/* 🔹 Popup Notification */}
      {popup && <div className="review-popup">{popup}</div>}

      <div className="main-wrapper">
        <div className="dashboard-wrapper">
          <header className="dashboard-header">
            <div>
              <h2>👋 Welcome, {user?.name}</h2>
              <p className="subtitle">
                Manage your employees and track attendance efficiently.
              </p>
            </div>
            <div className="stat-card">
              <h4>Total Employees</h4>
              <p className="total-lenem">{employees.length}</p>
            </div>
          </header>

          {/* ✅ Notification Section */}
         {/* {notifications.length > 0 && (
            <div className="notification-section">
              <h3>🔔 Latest Reviews</h3>
              {notifications.slice(0, 3).map((n, i) => (
                <div key={i} className="notification-card">
                  <strong>{n.name}</strong> wrote: “{n.text}”
                  <span className="notif-time">
                    {n.date} {n.time}
                  </span>
                </div>
              ))}
            </div>
          )} */}

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
