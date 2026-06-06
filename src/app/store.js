// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/models/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});