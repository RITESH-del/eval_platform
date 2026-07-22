// import { useState, useEffect } from "react";
// import { SegmentedControl, Card, Group} from "@mantine/core";
// import LoginForm from "../components/LoginForm";
// import SignUpForm from "../components/SignUpForm";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function RightPane() {
//   const [tab, setTab] = useState("login");

//   const user = useSelector(
//     state => state.auth.user
//   );

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;

//     if (user.role === "faculty") {
//         navigate("/Faculty");
//     }

//     if (user.role === "student") {
//         navigate("/student");
//     }
//   }, [user]);


//   return (
//     <div className="flex flex-col flex-1 justify-center items-center bg-[var(--mantine-color-body)]">
//       <Card shadow="lg" padding={30} withBorder className="min-w-120 gap-5">
//         {/* <SegmentedControl
//           size="md"
//           value={tab}
//           onChange={setTab}
//           data={[
//             { label: "Login", value: "login" },
//             { label: "Sign Up", value: "signup" },
//           ]}
//         /> */}

//         {/* {tab === "login" ? <LoginForm /> : <SignUpForm />} */}
//         <LoginForm />
//       </Card>
//     </div>
//   );
// }

// function LeftPane() {
//   return (
//     <div className="w-[60%] border-r border-gray-100 overflow-hidden">
//       <img src="/auth-banner.jpg" alt="" className="h-[120%] object-cover" />
//     </div>
//   );
// }

// export default function AuthPage() {
//   const [tab, setTab] = useState("login");

//   return (
//     <Group 
//       gap={0}
//       h="100vh"
//       wrap="nowrap"
//       align="stretch"
//       bg="var(--mantine-color-body)"
//       >
//       <LeftPane />
//       <RightPane />
//     </Group>
//   );
// }

import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState, useEffect } from "react";
import classes from './Auth.module.css';
import { useDispatch, useSelector } from "react-redux";
import { loginUser} from "../models/authThunks";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');


  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(loginUser({
      email: email,
      password: passwd
    }));
  }

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
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Welcome back!
        </Title>

        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" radius="md" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" radius="md" value={passwd} onChange={(e) => setPasswd(e.target.value)}/>
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md" radius="md" onClick={handleSubmit}>
          Login
        </Button>

        {/* <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text> */}
      </Paper>
    </div>
  )}