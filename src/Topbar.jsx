// Topbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/authSlice";
import "./Components/Topbar.css";

export default function Topbar() {
  const user = useSelector((s) => s.auth.user);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <h1 className="topbar-title">Admin Panel</h1>
      </div>

      <div className="topbar-right">
        <button
          className="menu-toggle1"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        <div className={`logout-container ${menuOpen ? "open" : ""}`}>
          <span className="admin-name">{user?.name || ""}</span>

          {/* ✅ See Reviews Button */}
          <button className="review-btn" onClick={() => navigate("/reviews")}>
            See Reviews
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
