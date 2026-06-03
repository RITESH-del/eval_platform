import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import App from "./App.jsx";
import { authRoutes } from './features/auth/routes';

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
  <MantineProvider>
    <RouterProvider router={router} />
  </MantineProvider>,
);
