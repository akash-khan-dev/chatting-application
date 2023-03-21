import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../UserSlice/UserSlice";

export const Store = configureStore({
  reducer: {
    logIn: UserSlice,
  },
});

export default Store;
