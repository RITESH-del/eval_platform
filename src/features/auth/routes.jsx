import { lazy } from 'react';

const AuthPage = lazy(() => import("./Pages/AuthPage"));
const ForgotPasswdPage = lazy(() => import("./Pages/ForgotPasswdPage.jsx"))

export const authRoutes = [
    {errorElement: ''},
    {
        path: '/login',
        element: <AuthPage />,
        
    },
    {
        path: '/forgotPasswd',
        element: <ForgotPasswdPage />
    }
]



