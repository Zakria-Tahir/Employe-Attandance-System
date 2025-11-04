import React from "react";

export default function NoticeModal({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Notice</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onClose} className="primary-btn">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
