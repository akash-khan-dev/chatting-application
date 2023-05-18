import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../UserSlice/UserSlice";
import ActiveSingleSlice from "../UserSlice/ActiveSingleSlice";

export const Store = configureStore({
  reducer: {
    logIn: UserSlice,
    active: ActiveSingleSlice,
  },
});

export default Store;
