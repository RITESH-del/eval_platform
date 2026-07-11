import { Navigate } from 'react-router-dom';
import StudentHomePage from './Pages/StudentHomePage.jsx';
import StudentSubmissionPage from './Pages/StudentSubmissionPage.jsx';

export const studentRoutes = [
  {
    path: '/student',
    element: <Navigate to="/student/results" replace />,
  },
  {
    path: '/student/results',
    element: <StudentHomePage />,
  },
  {
    path: '/student/dashboard',
    element: <StudentHomePage />,
  },
  {
    path: '/student/submission',
    element: <Navigate to="/student/results" replace />,
  },
  {
    path: '/student/submission/:examId',
    element: <StudentSubmissionPage />,
  },
];