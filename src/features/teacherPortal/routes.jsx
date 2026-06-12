import React from 'react';
import TeacherHomePage from './Pages/TeacherHomePage.jsx';
import LabDetails from './Pages/LabDetails.jsx';
import StudentDetails from './Pages/StudentDetails.jsx';
import ProtectedRoute from '../../shared/components/ProtectedRoute.jsx';  

export const teacherRoutes = [
  {
    path: "/TeacherHomePage",
    element: <ProtectedRoute role="faculty"><TeacherHomePage /></ProtectedRoute>
  },
  {
    path: "/TeacherHomePage/LabDetails/:examId",
    element: <ProtectedRoute role="faculty"><LabDetails /></ProtectedRoute>
  },
  {
    path: "/TeacherHomePage/LabDetails/:examId/StudentDetails/:sessionId",
    element: <ProtectedRoute role="faculty"><StudentDetails /></ProtectedRoute>
  }
];