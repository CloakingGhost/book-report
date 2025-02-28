import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username"),
  isLoggedIn: !!localStorage.getItem("username"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("username", action.payload);
    },
    logout: (state, action) => {
      state.username = null;
      state.isLoggedIn = false;
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
