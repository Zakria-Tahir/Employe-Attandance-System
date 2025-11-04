<img src="C:\Users\Zakria Tahir\vscode\employe-attandance-system\src\assets\admin.PNG"/>
<img src="C:\Users\Zakria Tahir\vscode\employe-attandance-system\src\assets\employe.PNG"/>
<img src="C:\Users\Zakria Tahir\vscode\employe-attandance-system\src\assets\login.PNG"/>

## 🖥️ Screenshots

### 🔐 Login Page
![Login Page](https://github.com/Zakria-Tahir/Employe-Attandance-System/blob/main/src/assets/admin.PNG?raw=true)

### 🏢 Admin Dashboard
![Admin Dashboard](https://github.com/Zakria-Tahir/Employe-Attandance-System/blob/main/src/assets/employe.PNG?raw=true)

### ⏱️ Employe Record
![Employe Record](https://github.com/Zakria-Tahir/Employe-Attandance-System/blob/main/src/assets/login.PNG?raw=true)


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

Employe-Attandance-System/</br>
│</br>
├── src/</br>
│   ├── Components/</br>
│   │   ├── admindashing.css</br>
│   │   ├── AttendanceRecord.css</br>
│   │   ├── Dashboard.css</br>
│   │   ├── EmployeeDashboard.css</br>
│   │   ├── EmployeeList.css</br>
│   │   ├── Header.css</br>
│   │   ├── LoginForm.css</br>
│   │   ├── Timecard.css</br>
│   │   ├── Topbar.css</br>
│   │</br>
│   ├── features/</br>
│   │   ├── attendanceSlice.jsx</br>
│   │   ├── authSlice.jsx</br>
│   │   └── employeeSlice.jsx</br>
│   │</br>
│   ├── hooks/</br>
│   │   └── useTimer.jsx</br>
│   │</br>
│   ├── Redux/</br>
│   │   └── store.jsx</br>
│   │</br>
│   ├── AddEmployeeModal.jsx</br>
│   ├── AdminDashboard.jsx</br>
│   ├── App.jsx</br>
│   ├── AttendanceRecord.jsx</br>
│   ├── AttendanceTable.jsx</br>
│   ├── EditAttendanceModal.jsx</br>
│   ├── EmployeeDashboard.jsx</br>
│   ├── EmployeeList.jsx</br>
│   ├── Header.jsx</br>
│   ├── index.css</br>
│   ├── LoginForm.jsx</br>
│   ├── main.jsx</br>
│   ├── NoticeModal.jsx</br>
│   ├── PasswordModal.jsx</br>
│   ├── ProtectedRoute.jsx</br>
│   ├── TimerCard.jsx</br>
│   └── Topbar.jsx</br>
│</br>
├── eslint.config.js</br>
├── index.html</br>
├── package-lock.json</br>
├── package.json</br>
├── README.md</br>
└── vite.config.js
