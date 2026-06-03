import {useState} from 'react'
import { useDisclosure } from '@mantine/hooks';
import { TextInput, PasswordInput, Stack, Button } from '@mantine/core';

export default function SignUpForm() {
     const [visible, { toggle }] = useDisclosure(false);
    return (
         <Stack gap="xl">
            <TextInput
                    size="md"
                    leftSectionPointerEvents="none"
                    // leftSection={icon}
                    label="Email address"
                    placeholder="Your email"
                  />

            <PasswordInput
                size="md"
                label="Password"
                defaultValue="secret"
                visible={visible}
                onVisibilityChange={toggle}
            />

            <PasswordInput
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
    </Stack>
    )
}