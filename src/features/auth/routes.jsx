import { lazy } from 'react';

const AuthPage = lazy(() => import("./Pages/AuthPage"));
const ForgotPasswdPage = lazy(() => import("./Pages/ForgotPasswdPage.jsx"))
const ChangePasswordPage = lazy(() => import("./Pages/ChangePassword.jsx"))

export const authRoutes = [
    {
        path: '/login',
        element: <AuthPage />,

    },
    {
        path: '/change-password',
        element: <ChangePasswordPage />
    },
    // {
    //     path: '/forgotPasswd',
    //     element: <ForgotPasswdPage />
    // }
]



