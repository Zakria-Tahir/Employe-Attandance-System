import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "./features/employeeSlice.jsx";
import "./Components/EmployeeList.css";

export default function EmployeeList() {
  const employees = useSelector((s) => s.employees.list);
  const dispatch = useDispatch();

  // for confirmation modal
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleConfirm = (id) => {
    setConfirmDelete(id); // open confirmation modal
  };

  const handleDelete = () => {
    if (confirmDelete !== null) {
      dispatch(deleteEmployee(confirmDelete));
      setConfirmDelete(null);
    }
  };

  return (
    <div className="employee-list">
      <h2 className="emp-list2">Employe List</h2>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.designation}</td>
                  <td>{e.email}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleConfirm(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
