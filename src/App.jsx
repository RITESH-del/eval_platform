import { useState } from "react";
import { Button } from "@mantine/core";
import AuthPage from "./features/auth/Pages/AuthPage.jsx";

import TeacherHomePage from "./features/teacherPortal/Pages/TeacherHomePage.jsx";
import LabDetailsPage from "./features/teacherPortal/Pages/LabDetails.jsx";
import { notifications } from "@mantine/notifications";

function App() {
  return (
    <>
    <AuthPage />
    </>
  );
}

export default App;





