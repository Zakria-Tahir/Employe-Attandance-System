import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./features/authSlice.jsx";
import { checkin, checkout, loadAttendance } from "./features/attendanceSlice.jsx";
import Header from "./Header.jsx";
import TimerCard from "./TimerCard.jsx";
import AttendanceTable from "./AttendanceTable.jsx";
import PasswordModal from "./PasswordModal.jsx";
import NoticeModal from "./NoticeModal.jsx";
import "./Components/EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const attendance = useSelector((s) => s.attendance.data[user?.id] || []);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    dispatch(loadAttendance());
  }, [dispatch]);

  const todayRec = attendance.find(
    (r) => new Date(r.date).toDateString() === new Date().toDateString()
  );

  const handleCheckin = () => {
    dispatch(checkin({ user }));
    setNotice("Check-in successful.");
  };

  const handleCheckout = () => {
    dispatch(checkout({ user }));
    setNotice("Check-out successful.");
  };

  return (
    <div className="emp-dashboard">
      <Header user={user} onLogout={() => dispatch(logout())} onChangePwd={() => setShowPwdModal(true)} />
      <TimerCard current={todayRec} onCheckin={handleCheckin} onCheckout={handleCheckout} />
      <AttendanceTable records={attendance} />
      {showPwdModal && <PasswordModal user={user} onClose={() => setShowPwdModal(false)} />}
      <NoticeModal message={notice} onClose={() => setNotice("")} />
    </div>
  );
}
