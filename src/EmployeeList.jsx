import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "./features/employeeSlice.jsx";
import "./Components/EmployeeList.css";

export default function EmployeeList() {
  const employees = useSelector((s) => s.employees.list);
  const dispatch = useDispatch();

  const [profiles, setProfiles] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // ✅ Load profiles from localStorage
  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    setProfiles(storedProfiles);
  }, [employees]); // re-check when employees change

  const handleConfirm = (id) => {
    setConfirmDelete(id);
  };

  const handleDelete = () => {
    if (confirmDelete !== null) {
      dispatch(deleteEmployee(confirmDelete));

      // ✅ Remove profile for that employee also
      const updatedProfiles = profiles.filter(
        (p) => String(p.employeeId) !== String(confirmDelete)
      );
      setProfiles(updatedProfiles);
      localStorage.setItem("profiles", JSON.stringify(updatedProfiles));

      setConfirmDelete(null);
    }
  };

  // ✅ Helper: find profile info for employee
  const getProfile = (id) => {
    return profiles.find((p) => String(p.employeeId) === String(id)) || {};
  };

  return (
    <div className="employee-list">
      <h2 className="emp-list2">Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Education</th>
                <th>Experience</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((e) => {
                const profile = getProfile(e.id);
                return (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.designation}</td>
                    <td>{e.email}</td>
                    <td>{profile.number || "-"}</td>
                    <td>{profile.education || "-"}</td>
                    <td>{profile.experience || "-"}</td>
                    <td>{profile.company || "-"}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleConfirm(e.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Confirmation Modal */}
      {confirmDelete !== null && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-actions">
              <button className="primary-btn1" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
