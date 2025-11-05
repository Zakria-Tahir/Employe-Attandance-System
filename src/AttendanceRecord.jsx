// src/AttendanceRecord.jsx
import React, { useState, useMemo } from "react";
import Topbar from "./Topbar.jsx";
import "./Components/AttendanceRecord.css";

function fmtTime(iso) {
  return iso
    ? new Date(iso).toLocaleTimeString("en-PK", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";
}
function fmtDate(iso) {
  return iso ? new Date(iso).toLocaleDateString("en-PK") : "-";
}

export default function AttendanceRecord() {
  const attendanceObj = JSON.parse(localStorage.getItem("attendance") || "{}");
  const employeeList = JSON.parse(localStorage.getItem("employees") || "[]");
  const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
  const [search, setSearch] = useState("");

  const groupedData = useMemo(() => {
    const groups = {};

    Object.keys(attendanceObj).forEach((userId) => {
      const records = Array.isArray(attendanceObj[userId])
        ? attendanceObj[userId]
        : [];
      if (!records.length) return;

      // ✅ Find employee info
      const employee =
        employeeList.find(
          (emp) =>
            String(emp.id) === String(userId) ||
            String(emp.employeeId) === String(userId)
        ) || {};

      // ✅ Find profile info for this employee
      const profile =
        profiles.find(
          (p) =>
            String(p.employeeId) === String(userId) ||
            String(p.id) === String(userId)
        ) || {};

      const userInfo = {
        name:
          employee.name ||
          records[0]?.name ||
          records[0]?.employeeName ||
          "Unknown",
        email:
          employee.email ||
          records[0]?.email ||
          "No Email",
        designation:
          employee.designation ||
          employee.employeeDesignation ||
          records[0]?.designation ||
          "Employee",
        phone: profile.number || "-", // ✅ phone number from profiles
      };

      groups[userId] = {
        ...userInfo,
        records: records.sort((a, b) => new Date(b.date) - new Date(a.date)),
      };
    });

    return groups;
  }, [attendanceObj, employeeList, profiles]);

  const filteredEmployees = Object.entries(groupedData).filter(([_, emp]) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const employeesToShow = search.trim()
    ? filteredEmployees
    : Object.entries(groupedData);

  return (
    <div className="attendance-main">
      <Topbar />

      <div className="attendance-container">
        <header className="attendance-header">
          <h2>📅 Employee Attendance Records</h2>
          <input
            type="text"
            className="attendance-search"
            placeholder="🔍 Search employee by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        {employeesToShow.length === 0 ? (
          <p className="no-records">No matching employee found.</p>
        ) : (
          employeesToShow.map(([userId, emp]) => (
            <section key={userId} className="employee-record-card">
              <div className="employee-header">
                <div className="emp-info">
                  <h3>{emp.name}</h3>
                  <p className="emp-role">{emp.designation}</p>
                  <p className="emp-email">{emp.email}</p>
                  <p className="emp-phone">📞 {emp.phone}</p> {/* ✅ Added phone */}
                </div>
              </div>

              <div className="attendance-table-wrapper">
                {emp.records.length === 0 ? (
                  <p>No attendance data available.</p>
                ) : (
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Worked</th>
                        <th>Office Hour</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emp.records.map((r, idx) => (
                        <tr key={idx}>
                          <td>{fmtDate(r.date)}</td>
                          <td>{fmtTime(r.checkin)}</td>
                          <td>{fmtTime(r.checkout)}</td>
                          <td>
                            {r.workedMs
                              ? `${Math.floor(r.workedMs / 3600000)}h ${Math.round(
                                  (r.workedMs % 3600000) / 60000
                                )}m`
                              : "-"}
                          </td>
                          <td>9:00</td>
                          <td>{r.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
