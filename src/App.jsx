import { useState } from "react";
import { Button } from "@mantine/core";
import AuthPage from "./features/auth/Pages/AuthPage.jsx";

import TeacherHomePage from "./features/teacherPortal/Pages/TeacherHomePage.jsx";
import LabDetailsPage from "./features/teacherPortal/Pages/LabDetails.jsx";
function App() {
  return (
    <div className="h-screen w-screen">
      {/* <Button className="absolute top-1/2 left-1/2">
      Click Me
    </Button> */}
      {/* <AuthPage /> */}    
      <TeacherHomePage/>
      {/* <LabDetailsPage/>  */}
    </div>
  );
}

export default App;





