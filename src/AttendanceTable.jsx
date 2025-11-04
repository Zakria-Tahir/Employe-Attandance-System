import React from "react";

const fmtTime = (iso) =>
  iso ? new Date(iso).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" }) : "-";
const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-PK");
const msToHoursString = (ms) => {
  if (!ms || ms <= 0) return "-";
  const totalMinutes = Math.round(ms / 60000);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
};
const OFFICE_HOURS_MS = 9 * 60 * 60 * 1000;

export default function AttendanceTable({ records }) {
  const last30Days = records.filter(
    (r) => Date.now() - new Date(r.date).getTime() <= 1000 * 60 * 60 * 24 * 30
  );

  return (
    <section className="records-section">
      <h3>Attendance (Last 30 Days)</h3>
      <div className="records-table-wrap">
        <table className="records-table">
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
            {last30Days.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                  No records found.
                </td>
              </tr>
            ) : (
              last30Days.map((r) => (
                <tr key={r.date}>
                  <td>{fmtDate(r.date)}</td>
                  <td>{fmtTime(r.checkin)}</td>
                  <td>{fmtTime(r.checkout)}</td>
                  <td
                    style={{
                      color:
                        r.workedMs && r.workedMs < OFFICE_HOURS_MS ? "red" : "inherit",
                    }}
                  >
                    {msToHoursString(r.workedMs)}
                  </td>
                  <td>9:00</td>
                  <td>{r.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
