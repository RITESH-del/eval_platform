import {useState} from 'react'
import { TextInput, PasswordInput, Stack, Button, Divider, Text } from '@mantine/core'
import { useDispatch } from "react-redux";
import { loginUser} from "../models/authThunks";
import GoogleAuthBtn from "./GoogleAuthBtn";


// Use useForm from mantine
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');


    const dispatch = useDispatch();

    function handleSubmit() {
        dispatch(loginUser({
            email: email,
            password: passwd
        }));
    }

    return (
    <Stack gap='xl'>
    <TextInput
        withAsterisk
        size="md"
        leftSectionPointerEvents="none"
        // leftSection={icon}
        label="Email address"
        placeholder="Your email"
        value={email}
        onChange={e => {setEmail(e.target.value)}}
      />

      <PasswordInput 
      withAsterisk
      size="md"
      label="Password"
      placeholder="Your password" 
    //   loading 
      value={passwd}
      onChange={e => {setPasswd(e.target.value)}}
      />

      <Button 
      size="md"
      fullWidth
      onClick={handleSubmit}
      >Sign In </Button>

       <Divider
        label={
          <Text size="md">
             Or
          </Text>
             }
        labelPosition="center"
        />

                <GoogleAuthBtn />
    </Stack>
    )
}