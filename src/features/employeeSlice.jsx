import { createSlice } from "@reduxjs/toolkit";

const stored = JSON.parse(localStorage.getItem("employees")) || [];

const employeeSlice = createSlice({
  name: "employees",
  initialState: { list: stored },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state.list));
    },
    updateAttendance: (state, action) => {
      const { id, attendance } = action.payload;
      const emp = state.list.find((e) => e.id === id);
      if (emp) emp.attendance = attendance;
      localStorage.setItem("employees", JSON.stringify(state.list));
    },
    deleteEmployee: (state, action) => {
      const id = action.payload;
      // Remove from employee list
      state.list = state.list.filter((e) => e.id !== id);
      localStorage.setItem("employees", JSON.stringify(state.list));

      // Remove attendance record if exists
      const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
      if (attendance[id]) {
        delete attendance[id];
        localStorage.setItem("attendance", JSON.stringify(attendance));
      }
    },
  },
});

export const { addEmployee, updateAttendance, deleteEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
