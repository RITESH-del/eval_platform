import AuthPage from "./Pages/AuthPage";
import ForgotPasswdPage from "./Pages/ForgotPasswdPage.jsx"

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



