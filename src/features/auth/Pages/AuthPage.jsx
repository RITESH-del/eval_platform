import { useState, useEffect } from "react";
import { SegmentedControl, Card } from "@mantine/core";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RightPane() {
  const [tab, setTab] = useState("login");

  const user = useSelector(
    state => state.auth.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (user.role === "faculty") {
        navigate("/Faculty");
    }

    if (user.role === "student") {
        navigate("/student");
    }
  }, [user]);


  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-white">
      <Card shadow="lg" padding={30} withBorder className="min-w-120 gap-5">
        {/* <SegmentedControl
          size="md"
          value={tab}
          onChange={setTab}
          data={[
            { label: "Login", value: "login" },
            { label: "Sign Up", value: "signup" },
          ]}
        /> */}

        {/* {tab === "login" ? <LoginForm /> : <SignUpForm />} */}
        <LoginForm />
      </Card>
    </div>
  );
}

function LeftPane() {
  return (
    <div className="w-[60%] border-r border-gray-100 overflow-hidden">
      <img src="/auth-banner.jpg" alt="" className="h-[120%] object-cover" />
    </div>
  );
}

export default function AuthPage() {
  const [tab, setTab] = useState("login");

  return (
    <div className="h-screen flex">
      <LeftPane />
      <RightPane />
    </div>
  );
}
