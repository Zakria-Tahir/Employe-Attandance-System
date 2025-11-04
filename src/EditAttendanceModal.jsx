import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAttendance } from "./features/employeeSlice.jsx";
import "./Components/Dashboard.css";

export default function EditAttendanceModal({ close }) {
  const employees = useSelector((s) => s.employees.list || []);
  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState("");
  const [type, setType] = useState("checkin");
  const [attendance, setAttendance] = useState({ date: "", time: "" });
  const [popup, setPopup] = useState({ type: "", message: "" }); // ✅ Popup state

  const showPopup = (type, message, duration = 2000) => {
    setPopup({ type, message });
    setTimeout(() => setPopup({ type: "", message: "" }), duration);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || !attendance.date || !attendance.time) return;

    const employee = employees.find(
      (emp) => String(emp.id) === String(selectedId)
    );
    if (!employee) return showPopup("error", "⚠️ Employee not found!");

    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || {};
    const empAttendance = Array.isArray(allAttendance[selectedId])
      ? allAttendance[selectedId]
      : [];

    const recordIndex = empAttendance.findIndex(
      (r) =>
        new Date(r.date).toDateString() ===
        new Date(attendance.date).toDateString()
    );

    // ⚠️ Show popup if no record found
    if (recordIndex === -1)
      return showPopup("error", "⚠️ No attendance record found!");

    const record = { ...empAttendance[recordIndex] };
    const localDateTime = `${attendance.date}T${attendance.time}`;
    record[type] = localDateTime;

    if (record.checkin && record.checkout) {
      const checkInDate = new Date(record.checkin);
      const checkOutDate = new Date(record.checkout);
      const diffMs = checkOutDate - checkInDate;

      if (diffMs > 0) {
        const breakStart = new Date(checkInDate);
        breakStart.setHours(13, 0, 0, 0);
        const breakEnd = new Date(checkInDate);
        breakEnd.setHours(14, 0, 0, 0);

        const overlapStart = Math.max(checkInDate.getTime(), breakStart.getTime());
        const overlapEnd = Math.min(checkOutDate.getTime(), breakEnd.getTime());
        const overlapMs = Math.max(0, overlapEnd - overlapStart);

        record.workedMs = diffMs - overlapMs;
      } else record.workedMs = 0;

      const OFFICE_HOURS_MS = 9 * 60 * 60 * 1000;
      record.status =
        record.workedMs >= OFFICE_HOURS_MS
          ? "Completed working hours"
          : "Not completed working hours";
    }

    empAttendance[recordIndex] = record;
    allAttendance[selectedId] = empAttendance;
    localStorage.setItem("attendance", JSON.stringify(allAttendance));

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && String(currentUser.id) === String(selectedId)) {
      localStorage.setItem("currentUserAttendance", JSON.stringify(empAttendance));
    }

    dispatch(updateAttendance({ id: selectedId, type, attendance: record }));

    // ✅ Show success popup and auto-close modal
    showPopup("success", "✅ Attendance updated successfully!");
    setTimeout(close, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>🕒 Edit Attendance</h3>
        <form className="attendance-form" onSubmit={handleSubmit}>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} - {e.designation}
              </option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="checkin">Check-in</option>
            <option value="checkout">Check-out</option>
          </select>

          <input
            type="date"
            value={attendance.date}
            onChange={(e) =>
              setAttendance({ ...attendance, date: e.target.value })
            }
            required
          />
          <input
            type="time"
            value={attendance.time}
            onChange={(e) =>
              setAttendance({ ...attendance, time: e.target.value })
            }
            required
          />

          <div className="modal-actions">
            <button type="submit" className="primary-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Popup message (Success or Error) */}
      {popup.message && (
        <div
          className={`popup-message ${
            popup.type === "success" ? "success-popup" : "error-popup"
          }`}
        >
          <div className="popup-box">{popup.message}</div>
        </div>
      )}
    </div>
  );
}
