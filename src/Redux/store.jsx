// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import employeeReducer from "../features/employeeSlice"; 
import attendanceReducer from "../features/attendanceSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    attendance: attendanceReducer,
  },
 
});
