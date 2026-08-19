import ManageFaculty from './pages/ManageFaculty.jsx';
import ManageStudents from './pages/ManageStudents.jsx';
import CommonLayout from './CommonLayout.jsx';
import ErrorPage from '../../shared/components/ErrorPage.jsx';
import ProtectedRoute from '../../shared/components/ProtectedRoute.jsx';


export const adminRoutes = [
     {
        path: "/admin",
        element: <CommonLayout />,
        errorElement: <ErrorPage />,
        children: [
    {
        index: true,
        element: (<ProtectedRoute role="admin">
            <ManageFaculty />
            </ProtectedRoute>)
    },
    {
        path: 'manage-students',
        element: (<ProtectedRoute role="admin">
            <ManageStudents />
            </ProtectedRoute>)
    },
    ]
    }];