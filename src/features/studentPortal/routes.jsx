import { Navigate } from 'react-router-dom';
import StudentHomePage from './Pages/StudentHomePage.jsx';
import StudentSubmissionPage from './Pages/StudentSubmissionPage.jsx';
import ErrorPage from "../../shared/components/ErrorPage.jsx";
import ProtectedRoute from '../../shared/components/ProtectedRoute.jsx'; 
import CommonLayout from './CommonLayout.jsx';

export const studentRoutes = [
  {
    path: "/student",
    element: <CommonLayout />,
    errorElement: <ErrorPage />,
    children: [
  {
    index: true,
    element: (
    <ProtectedRoute role="student">
      <StudentHomePage />
    </ProtectedRoute>
    ),
  },
  {
    path: 'dashboard',
    element: (
    <ProtectedRoute role="student">
      <StudentHomePage />
    </ProtectedRoute>
    ),
  },
  {
    path: 'results',
    element: (
    <ProtectedRoute role="student">
      <StudentHomePage />
    </ProtectedRoute>
    ),
  },
  {
    path: 'submission',
    element: (
    <ProtectedRoute role="student">
      <Navigate to="/student/results" replace />
    </ProtectedRoute>
    ),
  },
  {
    path: 'submission/:examId',
    element: (
    <ProtectedRoute role="student">
      <StudentSubmissionPage />
    </ProtectedRoute>
    ),
  },
  ]}
]
  