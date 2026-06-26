import { lazy } from 'react';

const AuthPage = lazy(() => import("./Pages/AuthPage"));
const ForgotPasswdPage = lazy(() => import("./Pages/ForgotPasswdPage.jsx"))

export const authRoutes = [
    {
        path: '/login',
        element: <AuthPage />,
        
    },
    {
        path: '/forgotPasswd',
        element: <ForgotPasswdPage />
    }
]



