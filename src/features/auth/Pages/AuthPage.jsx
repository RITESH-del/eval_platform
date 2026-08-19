
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

    if (user.role === "admin") {
        navigate("/admin");
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

        <Text ta="center" mt="md">
          {" "}
          <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
            change password
          </Anchor>
        </Text>
      </Paper>
    </div>
  )}