// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/models/authSlice";
import facultyReducer from "../features/teacherPortal/models/facultySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    faculty: facultyReducer,
  },
});