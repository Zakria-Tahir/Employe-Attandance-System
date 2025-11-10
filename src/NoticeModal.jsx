import React from "react";
import { getDatabase, ref, push } from "firebase/database";
import { app } from "./firebase"; // ✅ import your firebase.js file

export default function NoticeModal({ message, onClose }) {
  if (!message) return null;

  const handleOk = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("auth_user"));
      const db = getDatabase(app);

      // ✅ Store notice acknowledgment in Firebase
      await push(ref(db, "employee_notices"), {
        employeeEmail: currentUser?.email || "Unknown",
        message: message,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });

      console.log("✅ Notice log stored in Firebase");
    } catch (error) {
      console.error("❌ Error saving notice log:", error);
    }

    onClose(); // close the modal after storing
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>📢 Notice</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={handleOk} className="primary-btn">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
