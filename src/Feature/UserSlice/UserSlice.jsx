import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "login",
  initialState: {
    login: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : null,
  },
  reducers: {
    LoginUser: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { LoginUser } = UserSlice.actions;

export default UserSlice.reducer;
