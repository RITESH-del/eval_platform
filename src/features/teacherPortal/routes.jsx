import TeacherHomePage from './Pages/TeacherHomePage.jsx';
import LabDetails from './Pages/LabDetails.jsx';
import StudentDetails from './Pages/StudentDetails.jsx';
import ProtectedRoute from '../../shared/components/ProtectedRoute.jsx'; 
import MonitorSession from './Pages/MonitorSession.jsx';
import CreateQuizPage from "./Pages/CreateQuizPage.jsx"
import CommonLayout from './CommonLayout.jsx';
import ErrorPage from "../../shared/components/ErrorPage.jsx";



export const teacherRoutes = [
  {
    path: "/Faculty",
    element: <CommonLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="faculty">
            <TeacherHomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "LabDetails/:examId",
        element: (
          <ProtectedRoute role="faculty">
            <LabDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Lab-Sessions",
        element: (
          <ProtectedRoute role="faculty">
            <MonitorSession />
          </ProtectedRoute>
        ),
      },
      {
        path: "LabDetails/:examId/StudentDetails/:sessionId",
        element: (
          <ProtectedRoute role="faculty">
            <StudentDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-quiz",
        element: (
          <ProtectedRoute role="faculty">
            <CreateQuizPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-quiz/:quizId",
        element: (
          <ProtectedRoute role="faculty">
            <CreateQuizPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];