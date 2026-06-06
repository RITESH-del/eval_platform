import React from 'react';
import TeacherHomePage from './Pages/TeacherHomePage.jsx';
import LabDetails from './Pages/LabDetails.jsx';
import StudentDetails from './Pages/StudentDetails.jsx';

export const teacherRoutes = [
  {
    path: "/TeacherHomePage",
    element: <TeacherHomePage />
  },
  {
    path: "/TeacherHomePage/LabDetails",
    element: <LabDetails />
  },
  {
    path: "/TeacherHomePage/LabDetails/StudentDetails",
    element: <StudentDetails />
  }
];