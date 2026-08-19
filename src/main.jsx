import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createTheme, MantineProvider, } from "@mantine/core"
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
import { adminRoutes } from './features/adminPortal/routes.jsx';

import "@mantine/notifications/styles.css";
import ErrorPage from "./shared/components/ErrorPage.jsx"
import "mantine-datatable/styles.css"; // mantine-datatable stylesheet
import { ModalsProvider } from "@mantine/modals";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "./shared/components/toastui-custom.css";
// import { theme } from "./theme.js"
// import "@fontsource/hanken-grotesk";

// lazy loading
const App = lazy(() => import("./App.jsx"));


const theme = createTheme({
  fontFamily: "Helvetica",
  primary: "black",
  defaultRadius: "md",
    black: "#1C1B1A",
  white: "#F2F2F2",
});

const myColor = [
  "#fbffe2",
  "#f7ffcc",
  "#f0ff9a",
  "#e9ff70",
  "#e0ff38",
  "#dcff1d",
  "#d9ff09",
  "#c0e300",
  "#a9ca00",
  "#90ae00"
]

// const theme = createTheme({
//   fontFamily: "Helvetica, Arial, sans-serif",
//   // autoContrast: true,
//   // luminanceThreshold: 0.3,

//   // primaryColor: "amber",
//   // primaryShade: {
//   //   light: 5,
//   //   dark: 5,
//   // },

//   defaultRadius: "md",

//   black: "#1C1B1A",
//   white: "#F2F2F2",

//     colors: {
//     myColor,
//   },
//   primaryColor: 'myColor',

//    components: {
//     Button: {
//       styles: {
//         root: {
//           color: "#10002B",
//         },
//       },
//     },
//   },






// });



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
      ...studentRoutes,
      ...adminRoutes
  
]);

createRoot(document.getElementById("root")).render(
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <Provider store={store}>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Suspense fallback={<Spinner />}>
      <Notifications position="top-right" zIndex={10000} />
      <ModalsProvider>
        <RouterProvider
          router={router}
          />
      </ModalsProvider>
      </Suspense>
    </MantineProvider>
  </Provider>

</GoogleOAuthProvider>
);
