// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/models/authSlice";
import facultyReducer from "../features/teacherPortal/models/facultySlice";
import quizReducer from "../features/teacherPortal/models/quizSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    faculty: facultyReducer,
      quiz: quizReducer, 
  },
});