# 🕒 Employee Attendance System

A complete React-based Employee Attendance Management System that allows tracking, editing, and managing employee check-in/check-out times efficiently.  
The system supports real-time attendance calculation, break-time handling, and working hour validation.

---

## 🚀 Features

- ✅ Employee login and attendance tracking  
- ⏰ Record **check-in** and **check-out** times  
- 🧮 Auto-calculates total worked hours excluding breaks  
- 📅 Date-wise attendance history stored in `localStorage`  
- ✏️ Edit attendance records with an easy popup modal  
- 📊 Admin dashboard for viewing all employee records  
- 💾 Persistent data using **Redux Toolkit** + Local Storage  
- 🧠 Smart logic for “Completed / Not Completed” working hours  
- 🎨 Responsive and clean UI with reusable components  

---

## 🛠️ Technologies Used

| Category | Technology |
|-----------|-------------|
| Frontend | React.js, JSX, CSS3 |
| State Management | Redux Toolkit |
| Storage | LocalStorage |
| Styling | Custom CSS, Responsive Layout |
| Build Tool | Vite / Create React App |
| Icons & UI | React Icons / Custom Components |

## 🛠️ Technologies why Used

- **React.js (Vite)** – Frontend framework  
- **Redux Toolkit** – State management  
- **React Router** – Page routing  
- **CSS3** – Custom responsive design  
- **LocalStorage** – Persistent data saving 

---

## ⚙️ Installation Guide

Follow these steps to run the project locally:

Email: admin@example.com  
Password: admin123

1. **Clone this repository**
   ```bash
   git clone https://github.com/Zakria-Tahir/Employe-Attandance-System.git


## 📂 Project Folder Structure

Employe-Attandance-System/
│
├── src/</br>
│   ├── Components/
│   │   ├── admindashing.css
│   │   ├── AttendanceRecord.css
│   │   ├── Dashboard.css
│   │   ├── EmployeeDashboard.css
│   │   ├── EmployeeList.css
│   │   ├── Header.css
│   │   ├── LoginForm.css
│   │   ├── Timecard.css
│   │   ├── Topbar.css
│   │
│   ├── features/
│   │   ├── attendanceSlice.jsx
│   │   ├── authSlice.jsx
│   │   └── employeeSlice.jsx
│   │
│   ├── hooks/
│   │   └── useTimer.jsx
│   │
│   ├── Redux/
│   │   └── store.jsx
│   │
│   ├── AddEmployeeModal.jsx
│   ├── AdminDashboard.jsx
│   ├── App.jsx
│   ├── AttendanceRecord.jsx
│   ├── AttendanceTable.jsx
│   ├── EditAttendanceModal.jsx
│   ├── EmployeeDashboard.jsx
│   ├── EmployeeList.jsx
│   ├── Header.jsx
│   ├── index.css
│   ├── LoginForm.jsx
│   ├── main.jsx
│   ├── NoticeModal.jsx
│   ├── PasswordModal.jsx
│   ├── ProtectedRoute.jsx
│   ├── TimerCard.jsx
│   └── Topbar.jsx
│
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
