import { useState } from "react";
import { Button } from "@mantine/core";
import AuthPage from "./features/auth/Pages/AuthPage.jsx";

import TeacherHomePage from "./features/teacherPortal/Pages/TeacherHomePage.jsx";
import LabDetailsPage from "./features/teacherPortal/Pages/LabDetails.jsx";
import { notifications } from "@mantine/notifications";

function App() {
  return (
    <div className="h-screen w-screen">
      <Button
  onClick={() =>
    notifications.show({
      title: "Test",
      message: "Notification works",
      color: "green",
    })
  }
>
  Test Notification
</Button>
    </div>
  );
}

export default App;





