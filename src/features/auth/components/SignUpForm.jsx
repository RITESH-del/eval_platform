import {useState} from 'react'
import { useDisclosure } from '@mantine/hooks';
import { TextInput, PasswordInput, Stack, Button, Divider, Text } from '@mantine/core';
import { loginUser } from "../models/authThunks";
import GoogleAuthBtn from "./GoogleAuthBtn";

export default function SignUpForm() {
     
     
     const [visible, { toggle }] = useDisclosure(false);
    return (
         <Stack gap="xl">
            <TextInput
                    withAsterisk
                    size="md"
                    leftSectionPointerEvents="none"
                    // leftSection={icon}
                    label="Email address"
                    placeholder="Your email"
                  />

            <PasswordInput
                withAsterisk
                size="md"
                label="Password"
                defaultValue="secret"
                visible={visible}
                onVisibilityChange={toggle}
            />

            <PasswordInput
                withAsterisk
                size="md"
                label="Confirm password"
                defaultValue="secret"
                visible={visible}
                onVisibilityChange={toggle}
            />

            <Button 
            size="md"
            fullWidth
            className='mt-10'
            >Sign Up
            </Button>

             <Divider
                    label={
                      <Text size="md">
                         Or
                      </Text>
                         }
                    labelPosition="center"
                    />

            {/* <Button
            fullWidth
            size='md'
            color='black'
            leftSection={<img src='/google-svg.svg' alt='google-icons' className='h-8 w-8'/>}
            >
                Login with Google
            </Button> */}

            <GoogleAuthBtn />
    </Stack>
    )
}