import StudentHomePage from './Pages/StudentHomePage.jsx';
import StudentSubmissionPage from './Pages/StudentSubmissionPage.jsx';
export const studentRoutes = [
    {
        path: "/student",
        element: <StudentHomePage />
    },
    {
        path: "/student/submission",
        element: <StudentSubmissionPage />
    }
];