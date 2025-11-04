import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Login: admin or employee
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, isAdmin }, { rejectWithValue }) => {
    if (isAdmin) {
      if (email === "admin@example.com" && password === "admin123") {
        return { id: "1", name: "", email, isAdmin: true };
      }
      return rejectWithValue("Invalid admin credentials");
    } else {
      // Employee login check against localStorage employees
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      const user = employees.find(
        (e) => e.email === email && e.password === password
      );
      if (user) return { ...user, isAdmin: false };
      return rejectWithValue("Invalid employee credentials");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("auth_user")) || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("auth_user");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("auth_user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
