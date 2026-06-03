import { useState } from "react";
import { Button } from "@mantine/core";
import AuthPage from "./features/auth/Pages/AuthPage.jsx";

function App() {
  return (
    <div className="h-screen w-screen">
      {/* <Button className="absolute top-1/2 left-1/2">
      Click Me
    </Button> */}
      <AuthPage />
    </div>
  );
}

export default App;
