import React, { useState } from "react";

export default function PasswordModal({ user, onClose }) {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const handleSave = () => {
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const index = employees.findIndex((e) => e.email === user.email);
    if (index === -1) return alert("Employee not found.");
    if (employees[index].password !== oldPwd) return alert("Old password incorrect.");
    if (newPwd !== confirmPwd) return alert("Passwords do not match.");

    employees[index].password = newPwd;
    localStorage.setItem("employees", JSON.stringify(employees));
    alert("Password updated successfully!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSave} className="primary-btn">
            Save
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
