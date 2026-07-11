import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/models/authSlice';
import facultyReducer from '../features/teacherPortal/reducers/facultySlice';
import quizReducer from '../features/teacherPortal/reducers/quizSlice';
import studentReducer from '../features/studentPortal/models/studentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    faculty: facultyReducer,
    quiz: quizReducer,
    student: studentReducer,
  },
});