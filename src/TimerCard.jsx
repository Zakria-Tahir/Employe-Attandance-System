import React, { useEffect, useState } from "react";
import useTimer from "./Hooks/useTimer.jsx";
import "./Components/Timecard.css";

const OFFICE_HOURS_MS = 9 * 60 * 60 * 1000;

const fmtTime = (iso) =>
  iso ? new Date(iso).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" }) : "-";

const msToHoursString = (ms) => {
  if (!ms || ms <= 0) return "-";
  const totalMinutes = Math.round(ms / 60000);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
};

export default function TimerCard({ current, onCheckin, onCheckout }) {
  const elapsed = useTimer(current?.checkin && !current?.checkout ? current.checkin : null);
  const workedLess = current?.workedMs && current.workedMs < OFFICE_HOURS_MS;

  const [canCheckin, setCanCheckin] = useState(false);

  // Determine if check-in is allowed
  useEffect(() => {
    const now = new Date();
    const todayStr = now.toDateString();
    const currentRecordDate = current?.date ? new Date(current.date).toDateString() : null;

    // ✅ Allow check-in if:
    // 1️⃣ No check-in today yet, OR
    // 2️⃣ It's a new day after 8 AM
    if (!current || currentRecordDate !== todayStr) {
      const hour = now.getHours();
      if (hour >= 8) {
        setCanCheckin(true);
      } else {
        setCanCheckin(false);
      }
    } else if (current?.checkin && current?.checkout) {
      // ❌ If already checked out today — disable check-in
      setCanCheckin(false);
    } else {
      // ✅ If checked in but not yet checked out — show checkout
      setCanCheckin(false);
    }
  }, [current]);

  return (
    <section className="emp-timer-card">
      <h3>Today's Attendance</h3>
      <p className="office-time">🕘 Office Time: 10:00 AM – 8:00 PM</p>
      <p className="Break-time">🕘 Break Time: 01:00 PM – 02:00 PM</p>
      <p className="Prayers-time">🕘 Prayers Time: Fajar – 03:30 AM, Zhohar – 01:15 PM, Asar – 04:30 PM,
         Mhagrib – 05:30 PM, Isha – 06:30 PM</p>
      <div className="timer-row">
        <div className="timer-block">
          <div className="label">Status</div>
          <div className={`status ${current?.status?.toLowerCase() || ""}`}>
            {current?.status || ""}
          </div>
        </div>
        <div className="timer-block">
          <div className="label">Check-in</div>
          <div className="value">{fmtTime(current?.checkin)}</div>
        </div>
        <div className="timer-block">
          <div className="label">Check-out</div>
          <div className="value">{fmtTime(current?.checkout)}</div>
        </div>
        <div className="timer-block">
          <div className="label">Worked</div>
          <div className="value">{msToHoursString(current?.workedMs)}</div>
        </div>
        <div className="timer-block">
          <div className="label">Timer</div>
          <div className="value">
            {current?.checkin && !current?.checkout ? msToHoursString(elapsed) : ""}
          </div>
        </div>
      </div>

      {workedLess && current?.checkin && current?.checkout && (
        <div className="warning-text" style={{ marginTop: "10px", color: "red" }}>
          ⚠️ Not completed working hours
        </div>
      )}

      <div className="controls-row">
        {/* ✅ Only allow Check-In if no check-in today OR next day after 8AM */}
        {!current?.checkin || current?.checkout ? (
          <button
            className="checkin-btn"
            onClick={onCheckin}
            disabled={!canCheckin}
            style={{
              opacity: canCheckin ? 1 : 0.5,
              cursor: canCheckin ? "pointer" : "not-allowed",
            }}
          >
            Check In
          </button>
        ) : (
          <button className="checkout-btn" onClick={onCheckout}>
            Check Out
          </button>
        )}
      </div>

      {/* Optional Message */}
      {!canCheckin && current?.checkout && (
        <p style={{ color: "gray", fontSize: "13px", marginTop: "6px" }}>
          ✅ You already checked out today — next check-in available after 8:00 AM tomorrow.
        </p>
      )}
    </section>
  );
}
