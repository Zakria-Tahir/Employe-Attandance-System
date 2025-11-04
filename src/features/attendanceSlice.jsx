import { createSlice } from "@reduxjs/toolkit";

const loadFromLocal = () => JSON.parse(localStorage.getItem("attendance") || "{}");
const saveToLocal = (data) => localStorage.setItem("attendance", JSON.stringify(data));

const initialState = { data: loadFromLocal() };

const OFFICE_HOURS_MS = 9 * 60 * 60 * 1000;

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    loadAttendance(state, action) {
      state.data = loadFromLocal();
    },
    checkin(state, action) {
      const { user } = action.payload;
      const now = new Date();
      const userId = user.id;

      if (!state.data[userId]) state.data[userId] = [];

      const today = state.data[userId].find(
        (r) => new Date(r.date).toDateString() === now.toDateString()
      );

      if (!today) {
        state.data[userId].unshift({
          date: now.toISOString(),
          checkin: now.toISOString(),
          checkout: null,
          workedMs: 0,
          status: "Present",
          email: user.email,
          name: user.name,
        });
      } else {
        today.checkin = now.toISOString();
        today.checkout = null;
        today.status = "Present";
      }

      saveToLocal(state.data);
    },
    checkout(state, action) {
      const { user } = action.payload;
      const now = new Date();
      const userId = user.id;
      const recs = state.data[userId] || [];

      const today = recs.find(
        (r) => new Date(r.date).toDateString() === now.toDateString()
      );
      if (!today || !today.checkin) return;

      const worked = new Date(now) - new Date(today.checkin);
      today.checkout = now.toISOString();
      today.workedMs = (today.workedMs || 0) + worked;
      today.status = "Present";

      saveToLocal(state.data);
    },
  },
});

export const { loadAttendance, checkin, checkout } = attendanceSlice.actions;
export default attendanceSlice.reducer;
