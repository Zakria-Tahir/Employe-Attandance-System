import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { app } from "./firebase"; // ✅ import your firebase.js file
import "./Components/PasswordModal.css";

export default function PasswordModal({ user, onClose }) {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const showMessage = (message, type = "success") => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2000);
  };

  const handleSave = async () => {
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const index = employees.findIndex((e) => e.email === user.email);

    if (index === -1) return showMessage("⚠️ Employee not found.", "error");
    if (employees[index].password !== oldPwd)
      return showMessage("❌ Old password incorrect.", "error");
    if (newPwd !== confirmPwd)
      return showMessage("⚠️ Passwords do not match.", "error");

    // ✅ Update password locally
    employees[index].password = newPwd;
    localStorage.setItem("employees", JSON.stringify(employees));
    showMessage("✅ Password updated successfully!", "success");

    // ✅ Store popup message in Firebase
    try {
      const db = getDatabase(app);
      const logRef = ref(db, "password_update_logs");
      await push(logRef, {
        employeeEmail: user.email,
        message: "Password updated successfully!",
        timestamp: new Date().toISOString(),
      });
      console.log("✅ Log stored in Firebase");
    } catch (error) {
      console.error("❌ Error saving log:", error);
    }

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box password-modal">
        {/* ✅ Popup message */}
        {popup.show && (
          <div className={`popup-message ${popup.type}`}>{popup.message}</div>
        )}

        <h3>🔒 Change Password</h3>

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
          <button onClick={handleSave} className="primary-btn5">
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
