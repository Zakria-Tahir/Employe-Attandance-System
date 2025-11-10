import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "./features/employeeSlice.jsx";
import "./Components/Dashboard.css";

// ✅ Import Firebase Realtime Database utilities
import { db } from "./firebase";
import { ref, push } from "firebase/database";

export default function AddEmployeeModal({ close }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
  });
  const [dialog, setDialog] = useState(null);
  const dispatch = useDispatch();

  // ✅ Save message to Firebase
  const saveToFirebase = async (message, type) => {
    try {
      const admin = JSON.parse(localStorage.getItem("auth_user")) || {};
      const logRef = ref(db, "adminLogs"); // Firebase path: adminLogs/
      const logData = {
        adminEmail: admin.email || "Unknown",
        message,
        type,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      await push(logRef, logData);
      console.log("✅ Log stored in Firebase:", logData);
    } catch (error) {
      console.error("❌ Error saving to Firebase:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];

    const emailExists = existingEmployees.some(
      (emp) => emp.email.toLowerCase() === form.email.toLowerCase()
    );

    if (emailExists) {
      const message = "❌ Email already exists!";
      setDialog({ type: "error", text: message });
      await saveToFirebase(message, "error");
      return;
    }

    const newEmp = { id: Date.now(), ...form, attendance: [] };
    dispatch(addEmployee(newEmp));
    localStorage.setItem(
      "employees",
      JSON.stringify([...existingEmployees, newEmp])
    );

    const message = "✅ Employee added successfully!";
    setDialog({ type: "success", text: message });
    await saveToFirebase(message, "success");

    // ✅ Auto close both dialogs
    setTimeout(() => {
      setDialog(null);
      close();
    }, 1500);
  };

  return (
    <>
      {dialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3
              style={{
                color: dialog.type === "error" ? "red" : "green",
                marginBottom: "10px",
              }}
            >
              {dialog.text}
            </h3>
          </div>
        </div>
      )}

      <div className="modal-overlay">
        <div className="modal-box">
          <h3>Add New Employee</h3>
          <form onSubmit={handleSubmit} className="modal-form">
            <input
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Email"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              placeholder="Password"
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <input
              placeholder="Designation"
              required
              value={form.designation}
              onChange={(e) => setForm({ ...form, designation: e.target.value })}
            />

            <div className="modal-actions">
              <button type="submit" className="primary-btn">
                Add
              </button>
              <button type="button" className="cancel-btn" onClick={close}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
