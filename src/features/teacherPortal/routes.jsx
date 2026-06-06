import React from 'react';
import TeacherHomePage from './Pages/TeacherHomePage.jsx';
import LabDetails from './Pages/LabDetails.jsx';

export const teacherRoutes = [
  {
    path: "/TeacherHomePage",
    element: <TeacherHomePage />
  },
  {
    // Ensure this string is exactly "/LabDetailsPage" with matching uppercase letters
    path: "/TeacherHomePage/LabDetailsPage",
    element: <LabDetails />
  }
];