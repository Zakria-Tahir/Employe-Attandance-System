import React, { useState } from "react";
import "./Components/Header.css";

export default function Header({ user, onLogout, onChangePwd }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="emp-header">
      {/* Left side: user info */}
      <div className="emp-info">
        <h2>Welcome, {user?.name}</h2>
        <span className="emp-meta">{user?.email}</span>
        <span className="emp-designation">{user?.designation}</span>
      </div>

      {/* Right side: buttons for desktop */}
      <div className={`btn-group ${menuOpen ? "open" : ""}`}>
        <button className="change-pwd-btn" onClick={onChangePwd}>
          Change Password
        </button>
        <button className="logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Mobile toggle button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>
    </header>
  );
}
