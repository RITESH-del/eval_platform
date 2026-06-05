import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import { lazy, Suspense } from 'react';
import { authRoutes } from './features/auth/routes';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from './app/store.js'
import Spinner from './shared/components/Spinner.jsx'

// lazy loading
const App = lazy(() => import("./App.jsx"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {errorElement: '',
      ...authRoutes
   //  }
]);

createRoot(document.getElementById("root")).render(
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <Provider store={store}>
    <MantineProvider>
      <Suspense fallback={<Spinner />}>
        <RouterProvider
          router={router}
          />
      </Suspense>
    </MantineProvider>
  </Provider>
</GoogleOAuthProvider>
);
