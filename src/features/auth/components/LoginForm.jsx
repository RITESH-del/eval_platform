import {useState} from 'react'
import { TextInput, PasswordInput, Stack, Button } from '@mantine/core'

// add google auth
export default function LoginForm() {
    return (
    <Stack gap='xl'>
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
      placeholder="Your password" 
      loading 
      />

      <Button 
      size="md"
      fullWidth
      >Sign In </Button>
    </Stack>
    )
}