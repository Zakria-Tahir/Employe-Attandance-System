import React, { useState } from "react";
import ProfileModal from "./ProfileModal.jsx";
import "./Components/Header.css";

export default function Header({ user, onLogout, onChangePwd }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="emp-header">
      {/* Left: user info */}
      <div className="emp-info">
        <h2>Welcome, {user?.name}</h2>
        <span className="emp-meta">{user?.email}</span>
        <span className="emp-designation">{user?.designation}</span>
      </div>

      {/* Right: buttons */}
      <div className={`btn-group ${menuOpen ? "open" : ""}`}>
        <button className="profile-btn" onClick={() => setShowProfile(true)}>
          Profile
        </button>
        <button className="change-pwd-btn" onClick={onChangePwd}>
          Change Password
        </button>
        <button className="logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Mobile toggle */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Profile Modal */}
      {showProfile && <ProfileModal close={() => setShowProfile(false)} />}
    </header>
  );
}
