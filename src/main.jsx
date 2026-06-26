import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { lazy, Suspense } from 'react'
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Provider } from "react-redux"
import { store } from './app/store.js'
import Spinner from './shared/components/Spinner.jsx'
import "mantine-datatable/styles.css"; // mantine-datatable stylesheet
import { Notifications } from "@mantine/notifications";
import { authRoutes } from './features/auth/routes'
import { teacherRoutes } from './features/teacherPortal/routes';
import { studentRoutes } from './features/studentPortal/routes';
import "@mantine/notifications/styles.css";
import ErrorPage from "./shared/components/ErrorPage.jsx"


// lazy loading
const App = lazy(() => import("./App.jsx"));

const router = createBrowserRouter([
  { 
    path: '/',
    element: <App />
  },
   {
      path: "*",
      element: <ErrorPage />,
    },
      ...authRoutes,
      ...teacherRoutes,
      ...studentRoutes
  
]);

createRoot(document.getElementById("root")).render(
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <Provider store={store}>
    <MantineProvider>
      <Suspense fallback={<Spinner />}>
      <Notifications position="top-right" zIndex={10000} />
        <RouterProvider
          router={router}
          />
      </Suspense>
    </MantineProvider>
  </Provider>

</GoogleOAuthProvider>
);
